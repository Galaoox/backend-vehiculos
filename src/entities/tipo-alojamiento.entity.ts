import { ColumnNumericTransformer } from '@utils/column-numeric-transformer.utility';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { Alojamiento } from '@entities/alojamiento.entity';

@Entity()
export class TipoAlojamiento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 200,
        nullable: false,
    })
    descripcion: string;

    @Column({
        length: 50,
        nullable: false,
    })
    nombre: string;

    @Column('int')
    capacidadPersonas: number;

    @Column('int')
    cantidadDisponibles: number;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valor: number;

    @Column({
        length: 200,
        nullable: true,
    })
    imagen: string;

    @OneToMany(() => Alojamiento, (alojamiento) => alojamiento.tipoAlojamiento)
    alojamientos: Alojamiento[];

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
