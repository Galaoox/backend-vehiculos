import { Roles } from '@entities/roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputRolDto } from './dto/input-rol.dto';
import { RolDto } from './dto/rol.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) {}

    async create(rol: InputRolDto): Promise<void> {
        this.rolesRepository.save(rol);
    }

    async update(id: number, rol: InputRolDto): Promise<void> {
        const rolToUpdate = await this.rolesRepository.findOne(id);
        if (!rolToUpdate) throw new Error("Rol doesn't exist");
        this.rolesRepository.save({ ...rolToUpdate, ...rol });
    }

    async findAll(): Promise<RolDto[]> {
        return this.rolesRepository.find({
            select: ['id', 'nombre'],
        });
    }

    async findOne(id: number): Promise<RolDto> {
        const data = await this.rolesRepository.findOne(id, {
            select: ['id', 'nombre'],
        });
        if (!data) throw new Error('Rol not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.rolesRepository.softDelete(id);
    }
}
