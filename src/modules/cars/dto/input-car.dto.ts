import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class InputCarDto {

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    year: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    averagePrice: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    brandId: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    stateId: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    lineId: number;
}
