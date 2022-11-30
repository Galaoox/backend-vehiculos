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
import { Roles } from '@entities/roles.entity';
import { Factura } from '@entities/factura.entity';
import { Alojamiento } from '@entities/alojamiento.entity';
import { Membresia } from '@entities/membresia.entity';
import { Entrada } from '@entities/entrada.entity';
import { TipoDocumento } from '@entities/tipo-documento.entity';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: false,
    })
    nombre1: string;

    @Column({
        length: 50,
        nullable: true,
    })
    nombre2: string;

    @Column({
        length: 50,
        nullable: false,
    })
    apellido1: string;

    @Column({
        length: 50,
        nullable: true,
    })
    apellido2: string;

    @Column({
        length: 15,
        nullable: false,
    })
    documento: string;

    @Column({
        length: 100,
        nullable: false,
        unique: true,
    })
    correoElectronico: string;

    @Column({
        length: 150,
        nullable: false,
    })
    contrasena: string;

    @ManyToOne(() => Roles, (rol) => rol.usuarios)
    rol: Roles;

    @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.usuarios)
    tipoDocumento: Roles;

    // @OneToMany(() => Factura, (factura) => factura.usuario)
    // facturas: Factura[];

    @OneToMany(() => Alojamiento, (alojamiento) => alojamiento.usuario)
    alojamientos: Alojamiento[];

    @OneToMany(() => Membresia, (membresia) => membresia.usuario)
    membresias: Membresia[];

    @OneToMany(() => Entrada, (entrada) => entrada.usuario)
    entradas: Entrada[];

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
