import { ElementoMenu } from '@entities/elemento-menu.entity';
import { CloudinaryModule } from '@modules/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementosMenuController } from './elementos-menu.controller';
import { ElementosMenuService } from './elementos-menu.service';

@Module({
    imports: [TypeOrmModule.forFeature([ElementoMenu]), CloudinaryModule],
    controllers: [ElementosMenuController],
    providers: [ElementosMenuService],
})
export class ElementosMenuModule {}
