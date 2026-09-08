import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from '../usuarios/usuarios.service.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { LoginResponseDto } from './dto/login-response.dto.js';
import { UsuarioResponseDto } from './dto/usuario-response.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import type { AuthenticatedRequest } from './jwt-auth.guard.js';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión con email y contraseña' })
  login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener los datos del usuario autenticado' })
  async perfil(@Req() request: AuthenticatedRequest): Promise<UsuarioResponseDto> {
    const usuario = await this.usuariosService.buscarPorId(request.user.sub);
    if (!usuario) {
      throw new NotFoundException('El usuario del token no existe');
    }
    return this.usuariosService.aResponseDto(usuario);
  }
}