import { ColumnNumericTransformer } from '@utils/column-numeric-transformer.utility';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from 'typeorm';
import { Brand } from '@entities/brand.entity';
import { Line } from './line.entity';
import { State } from './state.entity';

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    year: number;

    @Column({
        length: 200,
        nullable: true,
    })
    image: string;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public averagePrice: number;

    @ManyToOne(() => Brand, (brand) => brand.cars, {
        cascade: true,
    })
    brand: Brand;

    @ManyToOne(() => Line, (line) => line.cars, {
        cascade: true,
    })
    line: Line;

    @ManyToOne(() => State, (state) => state.cars, {
        cascade: true,
    })
    state: State;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updated_at: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
