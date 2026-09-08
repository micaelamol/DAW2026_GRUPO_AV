import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EstadosUsuario } from '../usuarios/enums/estados-usuario.enum.js';
import { UsuarioEntity } from '../usuarios/entities/usuario.entity.js';
import { UsuariosService } from '../usuarios/usuarios.service.js';
import { LoginDto } from './dto/login.dto.js';
import { LoginResponseDto } from './dto/login-response.dto.js';
import { UsuarioResponseDto } from './dto/usuario-response.dto.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const usuario = await this.validarCredenciales(dto.email, dto.clave);
    return {
      accessToken: await this.generarToken(usuario),
      usuario: this.aResponseDto(usuario),
    };
  }

  private async validarCredenciales(
    email: string,
    clave: string,
  ): Promise<UsuarioEntity> {
    const usuario = await this.usuariosService.buscarPorEmailConClave(email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const claveValida = await bcrypt.compare(clave, usuario.clave);
    if (!claveValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    if (usuario.estado !== EstadosUsuario.ACTIVO) {
      throw new UnauthorizedException('El usuario está dado de baja');
    }
    return usuario;
  }

  private async generarToken(usuario: UsuarioEntity): Promise<string> {
    const payload: JwtPayload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };
    return this.jwtService.signAsync(payload);
  }

  private aResponseDto(usuario: UsuarioEntity): UsuarioResponseDto {
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
}