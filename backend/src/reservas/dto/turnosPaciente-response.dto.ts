import { NumericLiteral } from "typescript"
import { EstadosReservas } from "../enums/estados-reservas.enum.js"


export class TurnosPacienteResponseDto {
  idReserva: number
  idMedico: number
  idPaciente:number
  nombreMedico: string
  apellidoMedico: string
  fechaTurno: string
  valorConsulta: number
  estado: EstadosReservas
} 