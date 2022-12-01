import { Car } from '@entities/car.entity';
import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

define(Car, () => {
    const car = new Car();
    car.year = faker.datatype.number({
        min: 1970,
        max: 2023,
    });

    car.averagePrice = faker.datatype.number({
        min: 50000000,
        max: 200000000,
    });
    return car;
});
