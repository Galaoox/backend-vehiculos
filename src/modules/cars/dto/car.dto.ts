import { BrandDto } from "@modules/brands/dto/brand.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CarDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    year: number;
    @ApiProperty()
    averagePrice: number;
    @ApiProperty()
    brand: Partial<BrandDto>;
}
