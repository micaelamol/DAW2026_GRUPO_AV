
import { ParseIntPipe, BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ParseIdPipe extends ParseIntPipe {
  constructor() {
    super({
      exceptionFactory: () => new BadRequestException('El identificador debe ser un número entero válido'),
    });
  }
}