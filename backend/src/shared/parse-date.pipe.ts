import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value) {
      throw new BadRequestException('El parámetro fecha es obligatorio');
    }

    // Valida formato y existencia real de la fecha
    const parsedDate = new Date(value);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException(
        'Formato de fecha inválido. Ingrese una fecha válida (por ejemplo: YYYY-MM-DD o formato ISO)',
      );
    }

    // Devuelve el string validado (o parsedDate si prefieres retornar un objeto Date)
    return value;
  }
}