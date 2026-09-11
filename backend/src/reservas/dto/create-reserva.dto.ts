import { IsNotEmpty,IsNumber,IsDateString } from "class-validator";

export class CreateReservaDto{

    @IsNotEmpty({message: "Se debe indicar un medico"})
    @IsNumber()
    id_medico:number

    @IsNumber()
    @IsNotEmpty({message: "Se debe indicar un paciente"})
    id_paciente:number
    
    @IsNotEmpty({message: "Se debe indicar una fecha"})
    @IsDateString()
    fecha_hora:string;

}