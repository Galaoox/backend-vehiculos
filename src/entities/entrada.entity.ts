import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from 'typeorm';
import { Usuario } from '@entities/usuario.entity';
import { ColumnNumericTransformer } from '@utils/column-numeric-transformer.utility';
import { Factura } from '@entities/factura.entity';
import { TipoEntrada } from '@entities/tipo-entrada.entity';

@Entity()
export class Entrada {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valorUnitario: number;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valorTotal: number;

    @Column('int')
    public cantidad: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.entradas)
    usuario: Usuario;

    @ManyToOne(() => TipoEntrada, (tipoEntrada) => tipoEntrada.entradas)
    tipoEntrada: TipoEntrada;

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
