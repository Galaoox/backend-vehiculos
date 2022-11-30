import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class InputCarDto {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({
        maxLength: 50,
        nullable: false,
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    year: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    valor: number;

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
