import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Car } from '@entities/car.entity';
import { Brand } from './brand.entity';

@Entity()
export class Line {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: false,
    })
    name: string;

    @OneToMany(() => Car, (car) => car.line)
    cars: Car[];

    @ManyToOne(() => Brand, (brand) => brand.lines, {
        cascade: true,
    })
    brand: Brand;

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
