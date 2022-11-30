import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";
import { Car } from "@entities/car.entity";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: false,
    })
    name: string;

    @OneToMany(() => Car, (car) => car.brand)
    cars: Car[];

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    public created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    public updated_at: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
