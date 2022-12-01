import { State } from '@entities/state.entity';
import { define } from 'typeorm-seeding';

define(State, () => {
    return new State();
});
