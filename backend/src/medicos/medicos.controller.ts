import { Controller, Get, Patch, Param, Body, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { MedicosService } from "./medicos.service.js";
import { MedicosResponseDto } from "./dto/medicos-response.dto.js";
import { ActualizarValorConsultaDto } from "./dto/actualizar-valor-consulta.dto.js";
import { Roles } from "../auth/decorators/roles.decorator.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import { ParseIdPipe } from "../shared/parse-id.pipe.js";


@ApiTags('medicos')
@ApiBearerAuth()
@Controller('medicos')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @ApiOperation({ summary: 'devuelve la lista de medicos', description: 'devuelve la lista de medicos' })
  @Roles('ADMINISTRADOR', 'PACIENTE','MEDICO') 
  @Get("")
  listarMedicos() : Promise<MedicosResponseDto[]> {
    return this.medicosService.listarMedicos();
  }

  @ApiOperation({ summary: 'Actualiza el valor de la consulta de un médico (solo Administrador)' })
  @Roles('ADMINISTRADOR')
  @Patch(':id/valor-consulta')
  actualizarValorConsulta(
    @Param('id', ParseIdPipe) id: number,
    @Body() dto: ActualizarValorConsultaDto
  ) : Promise<MedicosResponseDto> {
    return this.medicosService.actualizarValorConsulta(id, dto.valorConsulta);
  }
}