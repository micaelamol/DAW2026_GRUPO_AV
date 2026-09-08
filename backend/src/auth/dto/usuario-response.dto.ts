import { ApiProperty } from '@nestjs/swagger';
import { EstadosUsuario } from '../../usuarios/enums/estados-usuario.enum.js';
import { RolesUsuario } from '../../usuarios/enums/roles-usuario.enum.js';

export class UsuarioResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '30111222' })
  documento: string;

  @ApiProperty({ example: 'Pérez' })
  apellidos: string;

  @ApiProperty({ example: 'María' })
  nombres: string;

  @ApiProperty({ example: 'maria@clinica.com' })
  email: string;

  @ApiProperty({ enum: EstadosUsuario, example: EstadosUsuario.ACTIVO })
  estado: EstadosUsuario;

  @ApiProperty({ enum: RolesUsuario, example: RolesUsuario.ADMINISTRADOR })
  rol: RolesUsuario;
}