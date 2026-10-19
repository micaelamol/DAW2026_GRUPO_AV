import { EstadosUsuario } from "../../usuarios/enums/estados-usuario.enum.js"
import { RolesUsuario } from "../../usuarios/enums/roles-usuario.enum.js"
import { EstadosReservas } from "../enums/estados-reservas.enum.js"



export class TurnosMedicoResponseDto {
    idRreserva: number
    valorConsulta: number
    estado: EstadosReservas
    idMedico: number
    idPaciente: number
    apellidosPaciente: string
    nombresPaciente: string
    emailPaciente: string
    estadoPaciente: EstadosUsuario
    rolPaciente: RolesUsuario
    fechaTurno: string 
}