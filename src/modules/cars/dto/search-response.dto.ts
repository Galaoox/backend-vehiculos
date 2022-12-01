import { ApiProperty } from '@nestjs/swagger';
import { CarDto } from './car.dto';

class Info {
    total: number;
    limit: number;
    page: number;
    maxPage: number;
    next: number;
}

export class SearchResponseDto {
    @ApiProperty({
        nullable: false,
    })
    data: CarDto[];
    @ApiProperty({
        nullable: false,
        type: Info,
    })
    info: Info;
}
