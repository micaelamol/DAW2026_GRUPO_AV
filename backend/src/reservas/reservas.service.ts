import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto.js';
import { ReservaEntity } from './entities/reserva.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class ReservasService {
    
    constructor() {}

    async crearReserva(dto: CreateReservaDto) { 
        const fechaTurno = new Date(dto.fecha_hora);
        this.validarFechaReserva(fechaTurno);
    }

    private validarFechaReserva(fechaTurno: Date) {

        const horaTurno = fechaTurno.getHours();
        if (horaTurno < 8 || horaTurno > 15) {
            throw new BadRequestException("El horario de atención es de 8 a 16 hs y los turnos duran 1 hora.");
        }
        const diaDeLaSemana = fechaTurno.getDay();
        if (diaDeLaSemana === 0 || diaDeLaSemana === 6) {
            throw new BadRequestException("Solo se atienden reservas de Lunes a Viernes.");
        }
        const hoy = new Date();
        const diferenciaMiliseg= fechaTurno.getTime() - hoy.getTime();
        const diferenciaDias = diferenciaMiliseg / (1000 * 60 * 60 * 24);

        if (diferenciaDias < 0) {
            throw new BadRequestException("No se pueden solicitar turnos en una fecha que ya paso.");
        }
        if (diferenciaDias > 30) {
            throw new BadRequestException("No se pueden hacer reservas con más de 30 días de anticipación.");
        }
    }
}