import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioResponseDto } from '../auth/dto/usuario-response.dto.js';
import { UsuarioEntity } from './entities/usuario.entity.js';
import { RolesUsuario } from './enums/roles-usuario.enum.js';
import { EstadosUsuario } from './enums/estados-usuario.enum.js';

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

  async listarPacientes(): Promise<UsuarioResponseDto[]> {
    const pacientes = await this.usuarioRepository.find({
      where: {
        rol: RolesUsuario.PACIENTE,
        estado: EstadosUsuario.ACTIVO,
      },
      order: {
        apellidos: 'ASC',
        nombres: 'ASC',
      },
    });

    return pacientes.map((p) => this.aResponseDto(p));
  }
}