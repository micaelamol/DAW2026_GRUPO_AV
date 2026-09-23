import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, type JwtModuleOptions, type JwtSignOptions } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js'; // 👈 1. Importamos el nuevo guardián

@Module({
  imports: [
    UsuariosModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>(
            'JWT_EXPIRES_IN',
            '8h',
          ) as JwtSignOptions['expiresIn'],
        },
      }),
    }),
  ],
  controllers: [AuthController],
  // 👈 2. Agregamos RolesGuard a los proveedores del módulo
  providers: [AuthService, JwtAuthGuard, RolesGuard], 
  // 👈 3. Lo exportamos para que ReservasModule (y cualquier otro) pueda usarlo
  exports: [JwtAuthGuard, RolesGuard], 
})
export class AuthModule {}
