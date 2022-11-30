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
import { Usuario } from '@entities/usuario.entity';
import { ColumnNumericTransformer } from '@utils/column-numeric-transformer.utility';
import { Membresia } from '@entities/membresia.entity';
import { Alojamiento } from '@entities/alojamiento.entity';
import { Entrada } from '@entities/entrada.entity';

@Entity()
export class Factura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valorTotal: number;

    // @ManyToOne(() => Usuario, (usuario) => usuario.facturas)
    // usuario: Usuario;

    // @OneToMany(() => Membresia, (membresia) => membresia.factura)
    // membresias: Membresia[];

    // @OneToMany(() => Alojamiento, (alojamiento) => alojamiento.factura)
    // alojamientos: Alojamiento[];

    // @OneToMany(() => Entrada, (entrada) => entrada.factura)
    // entradas: Entrada[];

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
