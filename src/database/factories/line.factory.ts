import { Line } from '@entities/line.entity';
import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

define(Line, () => {
    const line = new Line();
    line.name = faker.vehicle.model();
    return line;
});
