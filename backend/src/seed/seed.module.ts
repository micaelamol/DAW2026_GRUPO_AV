import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from '../usuarios/entities/medico.entity.js';
import { UsuarioEntity } from '../usuarios/entities/usuario.entity.js';
import { SeedService } from './seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, MedicoEntity])],
  providers: [SeedService],
})
export class SeedModule {}