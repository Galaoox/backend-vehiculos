import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementosMenuModule } from '@modules/cars/cars.module';
import { Brand } from '@entities/brand.entity';
import { Car } from '@entities/car.entity';
import { State } from '@entities/state.entity';
import { Line } from '@entities/line.entity';

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
                entities: [Brand, State, Line, Car],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        ElementosMenuModule,
    ],
    controllers: [],
})
export class AppModule {}
