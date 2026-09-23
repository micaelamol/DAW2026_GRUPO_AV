import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto.js';
import { ReservaEntity } from './entities/reserva.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadosReservas } from './enums/estados-reservas.enum.js';
import { MedicoEntity } from '../usuarios/entities/medico.entity.js';

@Injectable()
export class ReservasService {
    
    constructor(
        @InjectRepository(ReservaEntity) private reservaRepositorio: Repository<ReservaEntity>,
        @InjectRepository(MedicoEntity) private medicoRepositorio: Repository<MedicoEntity>
    ) {}

    // CREACIÓN RESERVAS (Pacientes y Administrador)
    
    async crearReserva(dto: CreateReservaDto) { 
        const fechaReserva = new Date(dto.fecha_hora);
        
        this.validarFechaReserva(fechaReserva);
        const reservaDuplicada = await this.reservaRepositorio.findOne({
            where: { medico: { id: dto.id_medico }, fecha_hora: fechaReserva, estado: EstadosReservas.ACTIVO }
        });
        const medico = await this.medicoRepositorio.findOne({ where: { id: dto.id_medico } });

        if (reservaDuplicada) {
            throw new BadRequestException("El turno a reservar ya esta ocupado, elije otro horario/fecha.");
        } 
        if (!medico) {
            throw new BadRequestException("El medico seleccionado no existe.");
        }

        const precioCongelado = medico.valorConsulta;

        const nuevaReserva = this.reservaRepositorio.create({
            fecha_hora: fechaReserva,
            estado: EstadosReservas.ACTIVO,
            valor_consulta: precioCongelado,
            medico: { id: dto.id_medico },
            paciente: { id: dto.id_paciente }
        });
        await this.reservaRepositorio.save(nuevaReserva);

        return nuevaReserva;
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

    // FILTROS POR ROL
    
    // Administrador: Ve absolutamente todas las reservas del sistema
    async listarTodasLasReservas() {
        return await this.reservaRepositorio.find({
            relations: { medico: true, paciente: true } 
        });
    }

    // Paciente: Ve únicamente sus propios turnos reservados
    async listarReservasPorPaciente(idPaciente: number) {
        return await this.reservaRepositorio.find({
            where: { paciente: { id: idPaciente } },
            relations: { medico: true }
        });
    }

    // Médico: Ve sus turnos reservados dada una fecha específica (Formato fecha: 'YYYY-MM-DD')
    async listarReservasPorMedicoYFecha(idMedico: number, fechaStr: string) {
    const inicioDia = new Date(`${fechaStr}T00:00:00`);
    const finDia = new Date(`${fechaStr}T23:59:59`);

    return await this.reservaRepositorio.createQueryBuilder('reserva')
        .leftJoinAndSelect('reserva.paciente', 'paciente')
        .where('reserva.id_medico = :idMedico', { idMedico }) 
        .andWhere('reserva.fecha_hora BETWEEN :inicioDia AND :finDia', { inicioDia, finDia })
        .getMany();
}
    
    // (Exclusivo Médico)
  
    async cambiarEstadoTurnoMedico(idReserva: number, nuevoEstado: 'atendido' | 'ausente') {
        const reserva = await this.reservaRepositorio.findOne({ where: { id: idReserva } });
        if (!reserva) {
            throw new BadRequestException("La reserva no existe.");
        }

        // Mapeamos los estados según los strings requeridos
        if (nuevoEstado === 'atendido') {
            reserva.estado = EstadosReservas.ATENDIDO; 
        } else if (nuevoEstado === 'ausente') {
            reserva.estado = EstadosReservas.AUSENTE; 
        } else {
            throw new BadRequestException("Estado inválido. Debe ser 'atendido' o 'ausente'.");
        }

        await this.reservaRepositorio.save(reserva);
        return { mensaje: `El turno cambió su estado a ${nuevoEstado} exitosamente.` };
    }

    
    // CANCELACIONES POR ROL 

    // Paciente: Permite cancelar solo hasta el día anterior
    async cancelarReservaComoPaciente(idReserva: number, idPaciente: number) {
        const reserva = await this.obtenerReservaValida(idReserva);
        
        if (reserva.paciente.id !== idPaciente) {
            throw new BadRequestException("No tienes permiso para cancelar esta reserva.");
        }

        const hoy = new Date();
        const fechaConsulta = new Date(reserva.fecha_hora);

        // Ponemos las horas a las 00:00:00 para comparar solo días calendarios completos
        hoy.setHours(0,0,0,0);
        fechaConsulta.setHours(0,0,0,0);

        // Si la fecha de la consulta es menor o igual al día de hoy, se rechaza
        if (fechaConsulta.getTime() <= hoy.getTime()) {
            throw new BadRequestException("Los pacientes solo pueden cancelar turnos hasta el día anterior a la consulta.");
        }

        return await this.aplicarCancelacion(reserva);
    }

    // Administrador: Permite cancelar hasta el momento en que inicia la consulta
    async cancelarReservaComoAdmin(idReserva: number) {
        const reserva = await this.obtenerReservaValida(idReserva);
        
        const ahora = new Date();
        const fechaHoraConsulta = new Date(reserva.fecha_hora);

        // Si el momento exacto actual es mayor al inicio programado del turno, se deniega
        if (ahora.getTime() >= fechaHoraConsulta.getTime()) {
            throw new BadRequestException("El administrador solo puede cancelar el turno antes del momento de inicio de la consulta.");
        }

        return await this.aplicarCancelacion(reserva);
    }

    // Métodos auxiliares privados para reutilizar código de cancelación
    private async obtenerReservaValida(id: number): Promise<ReservaEntity> {
        const reserva = await this.reservaRepositorio.findOne({ 
            where: { id },
            relations: { paciente: true }
        });

        if (!reserva) {
            throw new BadRequestException("La reserva que intentas cancelar no existe.");
        }
        if (reserva.estado === EstadosReservas.CANCELADO) {
            throw new BadRequestException("Esta reserva ya esta cancelada.");
        }
        return reserva;
    }

    private async aplicarCancelacion(reserva: ReservaEntity) {
        reserva.estado = EstadosReservas.CANCELADO;
        await this.reservaRepositorio.save(reserva);
        return { mensaje: `La reserva con ID ${reserva.id} fue cancelada exitosamente.` };
    }
}
