import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarDto } from "./dto/car.dto";
import { InputCarDto } from "./dto/input-car.dto";
import { CloudinaryService } from "@modules/cloudinary/cloudinary.service";
import { Car } from "@entities/car.entity";

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private repository: Repository<Car>,
        private cloudinary: CloudinaryService
    ) {}

    async create(data: InputCarDto): Promise<CarDto> {
        return await this.repository.save({
            ...data,
            brand: { id: data.brandId },
            line: { id: data.lineId },
            state: { id: data.stateId },
        });
    }

    async update(id: number, data: InputCarDto): Promise<void> {
        const dataToUpdate = await this.repository.findOne(id);
        if (!dataToUpdate) throw new Error("element doesn't exist");
        this.repository.save({
            ...dataToUpdate,
            ...data,
            brand: { id: data.brandId },
            line: { id: data.lineId },
            state: { id: data.stateId },
        });
    }

    async findAll(): Promise<CarDto[]> {
        const data = await this.repository.find({
            relations: ["brand", "line", "state"],
        });
        const promises = await data.map(async (item) => {
            return {
                ...item,
                imagen: await this.cloudinary.getUrlImage(item.image),
            };
        });
        const result = await Promise.all(promises);
        return result;
    }

    async findOne(id: number): Promise<CarDto> {
        const data = await this.repository.findOne(id, {
            relations: ["categoriaMenu"],
        });
        data.image = await this.cloudinary.getUrlImage(data.image);
        if (!data) throw new Error("element not found");
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.repository.softDelete(id);
    }

    async uploadImage(id: number, imagen: string): Promise<void> {
        const dataToUpdate = await this.repository.findOne(id);
        if (!dataToUpdate) throw new Error("Elemento Menu doesn't exist");
        if (dataToUpdate.image) {
            await this.cloudinary.deleteImage(dataToUpdate.image);
        }
        const result = await this.cloudinary
            .uploadImageBase64(imagen)
            .catch(() => {
                throw new BadRequestException("Invalid file type.");
            });
        dataToUpdate.image = result.public_id;
        this.repository.save(dataToUpdate);
    }
}
