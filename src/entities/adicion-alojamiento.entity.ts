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
import { Alojamiento } from '@entities/alojamiento.entity';
import { TipoAdicionAlojamiento } from '@entities/tipo-adicion-alojamiento.entity';

@Entity()
export class AdicionAlojamiento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    valor: number;

    @ManyToOne(
        () => Alojamiento,
        (alojamiento) => alojamiento.adicionesAlojamientos,
    )
    alojamiento: Alojamiento;

    @ManyToOne(
        () => TipoAdicionAlojamiento,
        (tipoAdicionAlojamiento) =>
            tipoAdicionAlojamiento.adicionesAlojamientos,
    )
    tipoAdicionAlojamiento: TipoAdicionAlojamiento;

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
