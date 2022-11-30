import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '@modules/roles/roles.module';
import { HorariosModule } from '@modules/horarios/horarios.module';
import { CategoriasMenuModule } from '@modules/categorias-menu/categorias-menu.module';
import { AtraccionesModule } from '@modules/atracciones/atracciones.module';
import { ElementosMenuModule } from '@modules/elementos-menu/elementos-menu.module';
import { Membresia } from '@entities/membresia.entity';
import { Factura } from '@entities/factura.entity';
import { TipoMembresia } from '@entities/tipo-membresia.entity';
import { Usuario } from '@entities/usuario.entity';
import { Alojamiento } from '@entities/alojamiento.entity';
import { TipoAlojamiento } from '@entities/tipo-alojamiento.entity';
import { AdicionAlojamiento } from '@entities/adicion-alojamiento.entity';
import { TipoAdicionAlojamiento } from '@entities/tipo-adicion-alojamiento.entity';
import { Entrada } from '@entities/entrada.entity';
import { TipoEntrada } from '@entities/tipo-entrada.entity';
import { Roles } from '@entities/roles.entity';
import { TipoDocumento } from '@entities/tipo-documento.entity';
import { Horario } from '@entities/horario.entity';
import { CategoriaMenu } from '@entities/categoria-menu.entity';
import { ElementoMenu } from '@entities/elemento-menu.entity';
import { Atraccion } from '@entities/atraccion.entity';
import { TiposDocumentosModule } from '@modules/tipos-documentos/tipos-documentos.module';
import { UsuariosModule } from '@modules/usuarios/usuarios.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TiposAdicionAlojamientoModule } from '@modules/tipos-adicion-alojamiento/tipos-adicion-alojamiento.module';
import { TiposAlojamientoModule } from './modules/tipos-alojamiento/tipos-alojamiento.module';
import { TiposMembresiasModule } from '@modules/tipos-membresias/tipos-membresias.module';
import { HospedajeModule } from '@modules/hospedaje/hospedaje.module';
import { MembresiasModule } from '@modules/membresias/membresias.module';
import { TiposEntradasModule } from '@modules/tipos-entradas/tipos-entradas.module';
import { EntradasModule } from '@modules/entradas/entradas.module';
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [
                    TipoMembresia,
                    Membresia,
                    Factura,
                    Usuario,
                    Alojamiento,
                    TipoAlojamiento,
                    AdicionAlojamiento,
                    TipoAdicionAlojamiento,
                    Entrada,
                    TipoEntrada,
                    Roles,
                    TipoDocumento,
                    Horario,
                    CategoriaMenu,
                    ElementoMenu,
                    Atraccion,
                ],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        RolesModule,
        HorariosModule,
        CategoriasMenuModule,
        AtraccionesModule,
        ElementosMenuModule,
        TiposDocumentosModule,
        UsuariosModule,
        AuthModule,
        TiposAdicionAlojamientoModule,
        TiposAlojamientoModule,
        TiposMembresiasModule,
        HospedajeModule,
        MembresiasModule,
        TiposEntradasModule,
        EntradasModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
