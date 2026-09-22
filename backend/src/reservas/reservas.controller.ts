import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import { ReservasService } from './reservas.service.js';
import { CreateReservaDto } from './dto/create-reserva.dto.js';

@Controller('reservas') //rutas /reservas
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}
//ruta crear reserva post
  @Post()
  crear(@Body() datosReserva: CreateReservaDto) {
    return this.reservasService.crearReserva(datosReserva); 
  }

//ruta listar reservas
  @Get()
  listar() {
    return this.reservasService.listarReservas();
  }
  //ruta cancelar reserva especfica
  @Delete(':id')
  cancelar(@Param('id') id: string) {
    return this.reservasService.cancelarReserva(+id);
  }
}