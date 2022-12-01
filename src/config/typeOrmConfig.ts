import { Brand } from '@entities/brand.entity';
import { Car } from '@entities/car.entity';
import { Line } from '@entities/line.entity';
import { State } from '@entities/state.entity';

export = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Brand, State, Line, Car],
    synchronize: true,
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
};
