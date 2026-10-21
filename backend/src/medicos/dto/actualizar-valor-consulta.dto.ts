import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarValorConsultaDto {
  @ApiProperty({
    description: 'Nuevo valor de la consulta',
    example: 15000,
  })
  @IsNumber({}, { message: 'El valor debe ser un número' })
  @IsNotEmpty({ message: 'El valor de la consulta es obligatorio' })
  @Min(1, { message: 'El valor debe ser mayor a 0' })
  valorConsulta: number;
}