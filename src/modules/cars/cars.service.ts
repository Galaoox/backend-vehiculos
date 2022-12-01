import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarDto } from './dto/car.dto';
import { InputCarDto } from './dto/input-car.dto';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';
import { Car } from '@entities/car.entity';
import { FilterSearchDto } from './dto/filter-search.dto';
import { SearchResponseDto } from './dto/search-response.dto';
import { State } from '@entities/state.entity';
import { Brand } from '@entities/brand.entity';
import { Line } from '@entities/line.entity';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private repository: Repository<Car>,
        private cloudinary: CloudinaryService,
        @InjectRepository(State)
        private stateRepository: Repository<State>,
        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>,
        @InjectRepository(Line)
        private lineRepository: Repository<Line>,
    ) {}

    async create(data: InputCarDto): Promise<CarDto> {
        return await this.repository.save({
            ...data,
            brand: { id: data.brandId },
            line: { id: data.lineId },
            state: { id: data.stateId },
        });
    }

    private async setImage(data: Car[]) {
        return await data.map(async (item) => {
            return {
                ...item,
                image: await this.cloudinary.getUrlImage(item.image),
            };
        });
    }

    async search(filters: FilterSearchDto): Promise<SearchResponseDto> {
        const where = {};
        if (filters.year) where['year'] = filters.year;
        if (filters.brandId) where['brand'] = { id: filters.brandId };
        if (filters.lineId) where['line'] = { id: filters.lineId };
        if (filters.stateId) where['state'] = { id: filters.stateId };

        const [results, total] = await this.repository.findAndCount({
            relations: ['brand', 'line', 'state'],
            take: Number(filters.options.limit),
            skip:
                (Number(filters.options.page) - 1) *
                Number(filters.options.limit),
            where: where,
        });
        const promises = await this.setImage(results);
        return {
            data: await Promise.all(promises),
            info: this.calcPagination(
                total,
                Number(filters.options.limit),
                Number(filters.options.page),
            ),
        };
    }

    async uploadImage(id: number, image: string): Promise<void> {
        const dataToUpdate = await this.repository.findOne({
            where: { id },
        });
        if (!dataToUpdate) throw new Error("Elemento Menu doesn't exist");
        if (dataToUpdate.image) {
            await this.cloudinary.deleteImage(dataToUpdate.image);
        }
        const result = await this.cloudinary
            .uploadImageBase64(image)
            .catch(() => {
                throw new BadRequestException('Invalid file type.');
            });
        dataToUpdate.image = result.public_id;
        this.repository.save(dataToUpdate);
    }

    async getLists() {
        return {
            listBrands: await this.brandRepository.find(),
            listStates: await this.stateRepository.find(),
        };
    }

    async getLineByBrand(id: number) {
        return await this.lineRepository.find({
            where: { brand: { id } },
        });
    }

    private calcPagination(total: number, limit: number, page: number) {
        const maxPage = Math.ceil(total / limit);
        const next = page + 1 > maxPage ? page : page + 1;
        return {
            total,
            limit,
            page,
            maxPage,
            next,
        };
    }
}
