import { ApiProperty } from '@nestjs/swagger';

export class CarDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    year: number;
    @ApiProperty()
    averagePrice: number;
    @ApiProperty()
    brand: {
        id: number;
        name: string;
    };
    @ApiProperty()
    line: {
        id: number;
        name: string;
    };

    @ApiProperty()
    state: {
        id: number;
        name: string;
    };
}
