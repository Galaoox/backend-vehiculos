import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { AdicionAlojamiento } from '@entities/adicion-alojamiento.entity';
import { ColumnNumericTransformer } from '@utils/column-numeric-transformer.utility';

@Entity()
export class TipoAdicionAlojamiento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: false,
    })
    nombre: string;

    @Column({
        length: 200,
        nullable: false,
    })
    descripcion: string;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valor: number;

    @OneToMany(
        () => AdicionAlojamiento,
        (adicionAlojamiento) => adicionAlojamiento.tipoAdicionAlojamiento,
    )
    adicionesAlojamientos: AdicionAlojamiento[];

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
