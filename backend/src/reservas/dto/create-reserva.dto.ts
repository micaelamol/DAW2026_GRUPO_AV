import { IsNotEmpty, IsNumber, IsDateString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {

    @ApiProperty({ 
        description: 'ID del médico asignado al turno', 
        example: 1 
    })
    @IsNotEmpty({ message: "Se debe indicar un medico" })
    @IsNumber()
    id_medico: number;

    @ApiProperty({ 
        description: 'ID del paciente que reserva el turno', 
        example: 2 
    })
    @IsNumber()
    @IsNotEmpty({ message: "Se debe indicar un paciente" })
    id_paciente: number;

    @ApiProperty({ 
        description: 'Fecha y hora del turno en formato ISO String (Recuerda elegir horario entre las 08:00 y 15:59 de Lunes a Viernes)', 
        example: '2026-10-15T09:00:00.000Z' 
    })
    @IsNotEmpty({ message: "Se debe indicar una fecha" })
    @IsDateString()
    fecha_hora: string;

}
