import { ColumnNumericTransformer } from '@utils/column-numeric-transformer.utility';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { TipoAlojamiento } from '@entities/tipo-alojamiento.entity';
import { AdicionAlojamiento } from '@entities/adicion-alojamiento.entity';
import { Factura } from '@entities/factura.entity';
import { Usuario } from '@entities/usuario.entity';

@Entity()
export class Alojamiento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    numeroPersonas: number;

    @Column('int')
    cantidadDias: number;

    @Column()
    fechaIngreso: Date;

    @Column()
    fechaSalida: Date;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valor: number;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valorTotal: number;

    @ManyToOne(
        () => TipoAlojamiento,
        (tipoAlojamiento) => tipoAlojamiento.alojamientos,
    )
    tipoAlojamiento: TipoAlojamiento;

    @ManyToOne(() => Usuario, (usuario) => usuario.alojamientos)
    usuario: Usuario;

    @OneToMany(
        () => AdicionAlojamiento,
        (adicionAlojamiento) => adicionAlojamiento.alojamiento,
    )
    adicionesAlojamientos: AdicionAlojamiento[];

    // @ManyToOne(() => Factura, (factura) => factura.alojamientos)
    // factura: Factura;

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
