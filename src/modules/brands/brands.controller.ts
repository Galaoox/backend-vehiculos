import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BrandDto } from "./dto/brand.dto";
import { BrandsService } from "./brands.service";
import { InputBrandDto } from "./dto/input-brand.dto";

@ApiTags("Brands")
@Controller("brands")
export class BrandsController {
    constructor(private service: BrandsService) {}

    @Post()
    async create(@Body() data: InputBrandDto): Promise<BrandDto> {
        try {
            return await this.service.create(data);
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<BrandDto[]> {
        return await this.service.findAll();
    }

    @Get("findOne/:id")
    async findOne(@Param("id") id: number): Promise<BrandDto> {
        try {
            return await this.service.findOne(id);
        } catch (error) {
            console.error(error);
            throw new NotFoundException();
        }
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() data: InputBrandDto) {
        try {
            await this.service.update(id, data);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(":id")
    async remove(@Param("id") id: number) {
        try {
            await this.service.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
