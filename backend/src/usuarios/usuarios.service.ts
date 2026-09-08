import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioResponseDto } from '../auth/dto/usuario-response.dto.js';
import { UsuarioEntity } from './entities/usuario.entity.js';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async buscarPorEmailConClave(email: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.clave')
      .where('usuario.email = :email', { email })
      .getOne();
  }

  async buscarPorId(id: number): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findOneBy({ id });
  }

  aResponseDto(usuario: UsuarioEntity): UsuarioResponseDto {
    return {
      id: usuario.id,
      documento: usuario.documento,
      apellidos: usuario.apellidos,
      nombres: usuario.nombres,
      email: usuario.email,
      estado: usuario.estado,
      rol: usuario.rol,
    };
  }

  async listar(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find();
  }
}