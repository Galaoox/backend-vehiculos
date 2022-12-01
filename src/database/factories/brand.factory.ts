import { Brand } from '@entities/brand.entity';
import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

define(Brand, () => {
    const brand = new Brand();
    brand.name = faker.vehicle.manufacturer();
    return brand;
});
