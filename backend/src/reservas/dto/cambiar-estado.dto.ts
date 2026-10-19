
import { IsIn, IsNotEmpty } from 'class-validator';

export class CambiarEstadoDto {
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsIn(['atendido', 'ausente'], { 
    message: 'El estado debe ser atendido o ausente' 
  })
  estado: 'atendido' | 'ausente';
}