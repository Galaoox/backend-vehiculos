import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BrandDto } from "./dto/brand.dto";
import { InputBrandDto } from "./dto/input-brand.dto";
import { Brand } from "@entities/brand.entity";

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brand)
        private repository: Repository<Brand>
    ) {}

    async create(data: InputBrandDto): Promise<BrandDto> {
        return await this.repository.save({
            ...data,
        });
    }

    async update(id: number, data: InputBrandDto): Promise<void> {
        const dataToUpdate = await this.repository.findOne(id);
        if (!dataToUpdate) throw new Error("element doesn't exist");
        this.repository.save({
            ...dataToUpdate,
            ...data,
        });
    }

    async findAll(): Promise<BrandDto[]> {
        const data = await this.repository.find();
        return data;
    }

    async findOne(id: number): Promise<BrandDto> {
        const data = await this.repository.findOne(id);
        if (!data) throw new Error("element not found");
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.repository.softDelete(id);
    }
}
