import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { MedicosService } from "./medicos.service.js";
import { MedicosResponseDto } from "./dto/medicos-response.dto.js";
import { Roles } from "../auth/decorators/roles.decorator.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";


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
}