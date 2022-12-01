import { ApiProperty } from '@nestjs/swagger';

interface Options {
    limit: string;
    page: string;
    id: string;
}

export class FilterSearchDto {
    @ApiProperty({
        nullable: true,
    })
    stateId: number;
    @ApiProperty({
        nullable: true,
    })
    year: number;
    @ApiProperty({
        nullable: true,
    })
    brandId: number;
    @ApiProperty({
        nullable: true,
    })
    lineId: number;
    @ApiProperty({
        nullable: false,
    })
    options: Options;
}
