import { CarDto } from './car.dto';

type GroupedCarDto = {
    [key: string]: CarDto[];
};

export { GroupedCarDto };
