import { Module } from '@nestjs/common';
import { TiposDocumentosController } from './tipos-documentos.controller';
import { TiposDocumentosService } from './tipos-documentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDocumento } from '@entities/tipo-documento.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TipoDocumento])],
    controllers: [TiposDocumentosController],
    providers: [TiposDocumentosService],
})
export class TiposDocumentosModule {}
