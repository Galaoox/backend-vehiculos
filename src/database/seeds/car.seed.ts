import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Brand } from '@entities/brand.entity';
import { Line } from '@entities/line.entity';
import { State } from '@entities/state.entity';
import { Car } from '@entities/car.entity';

export default class CarSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const stateNuevo = await factory(State)().create({
            id: 1,
            name: 'Nuevo',
        });
        const stateUsado = await factory(State)().create({
            id: 2,
            name: 'Usado',
        });

        const brands = await factory(Brand)()
            .map(async (brand: Brand) => {
                const lines: Line[] = await factory(Line)().createMany(5);
                brand.lines = lines;
                return brand;
            })
            .createMany(15);
        await factory(Car)()
            .map(async (car: Car) => {
                car.brand = brands[Math.floor(Math.random() * brands.length)];
                car.line =
                    car.brand.lines[
                        Math.floor(Math.random() * car.brand.lines.length)
                    ];
                car.state = [stateNuevo, stateUsado][
                    Math.floor(Math.random() * 2)
                ];
                car.image = '03042063-1_kdrayl';
                return car;
            })
            .createMany(15);
    }
}
