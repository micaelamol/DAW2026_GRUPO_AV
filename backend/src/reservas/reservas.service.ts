import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto.js';
import { ReservaEntity } from './entities/reserva.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadosReservas } from './enums/estados-reservas.enum.js';

@Injectable()
export class ReservasService {
    
    constructor(
        @InjectRepository(ReservaEntity)
        private reservaRepositorio: Repository<ReservaEntity>,
    ) {}

    async crearReserva(dto: CreateReservaDto) { 
        const fechaReserva = new Date(dto.fecha_hora);
        
        // 1. Validar reglas de negocio horarias y de calendario
        this.validarFechaReserva(fechaReserva);

        // 2. Verificar si el médico ya tiene un turno asignado en ese horario exacto
        const reservaDuplicada = await this.reservaRepositorio.findOne({
            where: { 
                medico: { id: dto.id_medico },
                fecha_hora: fechaReserva,
                estado: EstadosReservas.ACTIVO
            }
        });

        if (reservaDuplicada) {
            throw new BadRequestException("El médico ya tiene una reserva activa asignada para esa fecha y hora.");
        }

        // 3. Crear y guardar la nueva reserva en la base de datos
        const nuevaReserva = this.reservaRepositorio.create({
            ...dto,
            medico: { id: dto.id_medico },
            estado: EstadosReservas.ACTIVO
        });

        return await this.reservaRepositorio.save(nuevaReserva);
    }

    private validarFechaReserva(fechaReserva: Date) {
        const horaReserva = fechaReserva.getHours();
        if (horaReserva < 8 || horaReserva > 15) {
            throw new BadRequestException("El horario de atención es de 8 a 16 hs y los turnos duran 1 hora.");
        }

        const diaDeLaSemana = fechaReserva.getDay();
        if (diaDeLaSemana === 0 || diaDeLaSemana === 6) {
            throw new BadRequestException("Solo se atienden reservas de Lunes a Viernes.");
        }

        const hoy = new Date();
        const diferenciaMiliseg = fechaReserva.getTime() - hoy.getTime();
        const diferenciaDias = diferenciaMiliseg / (1000 * 60 * 60 * 24);

        if (diferenciaDias < 0) {
            throw new BadRequestException("No se pueden solicitar turnos en una fecha que ya paso.");
        }

        if (diferenciaDias > 30) {
            throw new BadRequestException("No se pueden hacer reservas con más de 30 días de anticipación.");
        }
    }
}




// import { Injectable, BadRequestException } from '@nestjs/common';
// import { CreateReservaDto } from './dto/create-reserva.dto.js';
// import { ReservaEntity } from './entities/reserva.entity.js';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { EstadosReservas } from './enums/estados-reservas.enum.js';

// @Injectable()
// export class ReservasService {
    
//     constructor(@InjectRepository(ReservaEntity)private reservaRepositorio: Repository<ReservaEntity>,) {}

//     async crearReserva(dto: CreateReservaDto) { 
//         const fechaReserva = new Date(dto.fecha_hora);
//         this.validarFechaReserva(fechaReserva);
//         const reservaDuplicada= await this.reservaRepositorio.findOne({where:{ medico:{ id: dto.id_medico },fecha_hora: dto.fechaReserva,estado:EstadosReservas.ACTIVO}})
//     }

//     private validarFechaReserva(fechaReserva: Date) {

//         const horaReserva = fechaReserva.getHours();
//         if (horaReserva < 8 || horaReserva > 15) {
//             throw new BadRequestException("El horario de atención es de 8 a 16 hs y los turnos duran 1 hora.");
//         }
//         const diaDeLaSemana = fechaReserva.getDay();
//         if (diaDeLaSemana === 0 || diaDeLaSemana === 6) {
//             throw new BadRequestException("Solo se atienden reservas de Lunes a Viernes.");
//         }
//         const hoy = new Date();
//         const diferenciaMiliseg= fechaReserva.getTime() - hoy.getTime();
//         const diferenciaDias = diferenciaMiliseg / (1000 * 60 * 60 * 24);

//         if (diferenciaDias < 0) {
//             throw new BadRequestException("No se pueden solicitar turnos en una fecha que ya paso.");
//         }
//         if (diferenciaDias > 30) {
//             throw new BadRequestException("No se pueden hacer reservas con más de 30 días de anticipación.");
//         }
//     }
// }