import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity.js';
import { MedicosEntity } from '../usuarios/entities/medico.entity.js';
import { UsuariosController } from './usuarios.controller.js';
import { UsuariosService } from './usuarios.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, MedicosEntity])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}