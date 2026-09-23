import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { ReservasService } from './reservas.service.js';
import { CreateReservaDto } from './dto/create-reserva.dto.js';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

// 👇 Importamos nuestros nuevos guardianes y decoradores organizados en sus carpetas
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('Reservas') 
@ApiBearerAuth() // 🔓 Agrega el candado de autenticación a este controlador en la interfaz de Swagger
@Controller('reservas') 
@UseGuards(JwtAuthGuard, RolesGuard) // 🔥 Protege TODOS los endpoints del controlador con Token y Rol
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  
  // RUTAS GENERALES / COMPARTIDAS
  
  // Crear una nueva reserva (Utilizado por Pacientes y Administradores)
  @Post()
  @Roles('PACIENTE', 'ADMINISTRADOR') // 👤 Permisos específicos
  @ApiOperation({ summary: 'Crear una nueva reserva (Pacientes y Administradores)' })
  crear(@Body() datosReserva: CreateReservaDto) {
    return this.reservasService.crearReserva(datosReserva); 
  }

  // RUTAS DEL ADMINISTRADOR
  
  // Listar absolutamente todas las reservas del sistema
  @Get('admin')
  @Roles('ADMINISTRADOR') // 🔑 Exclusivo Admin
  @ApiOperation({ summary: 'Listar absolutamente todas las reservas del sistema' })
  listarTodas() {
    return this.reservasService.listarTodasLasReservas();
  }

  // Cancelar reserva como Administrator (Permitido hasta el inicio del turno)
  @Delete('admin/:id')
  @Roles('ADMINISTRADOR') // 🔑 Exclusivo Admin
  @ApiOperation({ summary: 'Cancelar reserva como Administrador (Permitido hasta el inicio del turno)' })
  @ApiParam({ name: 'id', description: 'ID de la reserva que se quiere cancelar' })
  cancelarComoAdmin(@Param('id') id: string) {
    return this.reservasService.cancelarReservaComoAdmin(+id);
  }

  // RUTAS DEL PACIENTE
  
  // Listar turnos de un paciente específico
  @Get('paciente/:idPaciente')
  @Roles('PACIENTE', 'ADMINISTRADOR') // 👤 Paciente puede ver lo suyo, Admin puede ver todo
  @ApiOperation({ summary: 'Listar turnos de un paciente específico' })
  @ApiParam({ name: 'idPaciente', description: 'ID del paciente' })
  listarPorPaciente(@Param('idPaciente') idPaciente: string) {
    return this.reservasService.listarReservasPorPaciente(+idPaciente);
  }

  // Cancelar reserva como Paciente (Permitido solo hasta el día anterior)
  @Delete('paciente/:id/usuario/:idPaciente')
  @Roles('PACIENTE') // 👤 Exclusivo el Paciente
  @ApiOperation({ summary: 'Cancelar reserva como Paciente (Permitido solo hasta el día anterior)' })
  @ApiParam({ name: 'id', description: 'ID de la reserva' })
  @ApiParam({ name: 'idPaciente', description: 'ID del paciente solicitante' })
  cancelarComoPaciente(
    @Param('id') id: string,
    @Param('idPaciente') idPaciente: string
  ) {
    return this.reservasService.cancelarReservaComoPaciente(+id, +idPaciente);
  }

  // RUTAS DEL MÉDICO
  
  // Ver agenda del médico por fecha. Ejemplo: /reservas/medico/5?fecha=2026-10-15
  @Get('medico/:idMedico')
  @Roles('MEDICO', 'ADMINISTRADOR') // 🩺 Médico ve su agenda, Admin asiste
  @ApiOperation({ summary: 'Ver agenda del médico filtrada por fecha' })
  @ApiParam({ name: 'idMedico', description: 'ID del médico' })
  @ApiQuery({ name: 'fecha', description: 'Fecha a consultar (Formato requerido: YYYY-MM-DD)', example: '2026-10-15' })
  listarPorMedico(
    @Param('idMedico') idMedico: string,
    @Query('fecha') fecha: string
  ) {
    return this.reservasService.listarReservasPorMedicoYFecha(+idMedico, fecha);
  }

  // Marcar turno como atendido o ausente
  @Patch('medico/:id/estado')
  @Roles('MEDICO') // 🩺 Exclusivo el Médico asignado
  @ApiOperation({ summary: 'Marcar turno como atendido o ausente (Médicos)' })
  @ApiParam({ name: 'id', description: 'ID de la reserva' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        estado: { type: 'string', enum: ['atendido', 'ausente'], example: 'atendido' } 
      } 
    } 
  })
  cambiarEstado(
    @Param('id') id: string,
    @Body('estado') estado: 'atendido' | 'ausente'
  ) {
    return this.reservasService.cambiarEstadoTurnoMedico(+id, estado);
  }
}
