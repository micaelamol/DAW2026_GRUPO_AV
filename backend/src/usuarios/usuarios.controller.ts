import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UsuariosService } from './usuarios.service.js';
import { UsuarioResponseDto } from '../auth/dto/usuario-response.dto.js';

@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Lista todos los pacientes activos (solo Administrador)' })
  @Roles('ADMINISTRADOR')
  @Get('pacientes')
  listarPacientes(): Promise<UsuarioResponseDto[]> {
    return this.usuariosService.listarPacientes();
  }
}