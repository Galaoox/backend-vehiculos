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
import { CarDto } from "./dto/car.dto";
import { CarsService } from "./cars.service";
import { InputCarDto } from "./dto/input-car.dto";

@ApiTags("Cars")
@Controller("cars")
export class CarsController {
    constructor(private service: CarsService) {}

    @Post()
    async create(@Body() data: InputCarDto): Promise<CarDto> {
        try {
            return await this.service.create(data);
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<CarDto[]> {
        return await this.service.findAll();
    }

    @Get("findOne/:id")
    async findOne(@Param("id") id: number): Promise<CarDto> {
        try {
            return await this.service.findOne(id);
        } catch (error) {
            console.error(error);
            throw new NotFoundException();
        }
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() data: InputCarDto) {
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

    @Post("upload/:id")
    async upload(@Body() data, @Param("id") id: number) {
        try {
            await this.service.uploadImage(id, data.image);
        } catch (error) {
            console.log(error);
            throw new NotFoundException();
        }
    }
}
