import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto.js';
import { ReservaEntity } from './entities/reserva.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadosReservas } from './enums/estados-reservas.enum.js';
import { MedicosEntity } from '../usuarios/entities/medico.entity.js';
import { TurnosPacienteResponseDto } from './dto/turnosPaciente-response.dto.js';
import { TurnosMedicoResponseDto } from './dto/turnosMedico-response.dto.js';

@Injectable()
export class ReservasService {

    constructor(
        @InjectRepository(ReservaEntity) private reservaRepositorio: Repository<ReservaEntity>,
        @InjectRepository(MedicosEntity) private medicoRepositorio: Repository<MedicosEntity>
    ) { }

    // CREACIÓN RESERVAS (Pacientes y Administrador)

    async crearReserva(dto: CreateReservaDto): Promise<TurnosPacienteResponseDto> {
        const fechaReservaDate = new Date(dto.fecha_hora);
        if (isNaN(fechaReservaDate.getTime())) {
            throw new BadRequestException("Formato de fecha y hora inválido.");
        }

        this.validarFechaReserva(fechaReservaDate);

        const medico = await this.medicoRepositorio.findOne({ where: { id: dto.id_medico } });
        if (!medico) {
            throw new BadRequestException("El médico seleccionado no existe.");
        }

        // Validamos si ya existe un turno ocupado para ese médico (cualquier reserva que NO esté CANCELADA)
        const reservaDuplicada = await this.reservaRepositorio.createQueryBuilder('reserva')
            .where('reserva.id_medico = :idMedico', { idMedico: dto.id_medico })
            .andWhere('reserva.fecha_hora = :fechaHora', { fechaHora: fechaReservaDate })
            .andWhere('reserva.estado != :cancelado', { cancelado: EstadosReservas.CANCELADO })
            .getOne();

        if (reservaDuplicada) {
            throw new BadRequestException("El turno a reservar ya está ocupado, elija otro horario o fecha.");
        }

        const precioCongelado = medico.valorConsulta;

        const nuevaReserva = this.reservaRepositorio.create({
            fecha_hora: fechaReservaDate,
            estado: EstadosReservas.ACTIVO,
            valor_consulta: precioCongelado,
            medico: { id: dto.id_medico },
            paciente: { id: dto.id_paciente }
        });
        const reservaGuardada = await this.reservaRepositorio.save(nuevaReserva);

        const turno = new TurnosPacienteResponseDto();
        turno.idReserva = reservaGuardada.id;
        const fechaHora = reservaGuardada.fecha_hora instanceof Date 
            ? reservaGuardada.fecha_hora 
            : new Date(reservaGuardada.fecha_hora);
        turno.fechaTurno = fechaHora.toISOString();
        turno.estado = reservaGuardada.estado;
        turno.valorConsulta = reservaGuardada.valor_consulta;
        turno.idMedico = dto.id_medico;
        turno.idPaciente = dto.id_paciente;

        return turno;
    }

    private validarFechaReserva(fechaReserva: Date) {
        const horaReserva = fechaReserva.getHours() + 3; // Ajuste de zona horaria a UTC-3

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
        const minutos = fechaReserva.getMinutes()
        if (minutos != 0) {
            throw new BadRequestException("seleccione un horario válido, los minutos deben terminar en 00 .");
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
    async listarReservasPorPaciente(idPaciente: number): Promise<TurnosPacienteResponseDto[]> {
        /* return await this.reservaRepositorio.find({
            where: { paciente: { id: idPaciente } },
            relations: { medico: true }
        }); */
        const datos = await this.reservaRepositorio.createQueryBuilder('reserva')
            .innerJoin('reserva.medico', 'medico')
            .innerJoin('medico.usuario', 'usuario')
            .addSelect(['usuario.nombres', 'usuario.apellidos', 'medico.id'])
            .where('reserva.paciente = :idPaciente', { idPaciente: idPaciente })
            .getRawMany();

        return datos.map(d => {

            console.log('valor de reserva en reservaService: ', d)
            const dto = new TurnosPacienteResponseDto()
            dto.idReserva = d.reserva_id
            dto.idMedico = d.reserva_id_medico.id
            dto.idPaciente = d.reserva_id_paciente
            dto.nombreMedico = d.usuario_nombres
            dto.apellidoMedico = d.usuario_apellidos
            dto.fechaTurno = new Date(d.reserva_fecha_hora).toLocaleString('es-AR', {
                timeZone: 'America/Argentina/Buenos_Aires',
                hour12: false,
            });
            dto.valorConsulta = d.reserva_valor_consulta
            dto.estado = d.reserva_estado
            return dto
        })

    }

    // Médico: Ve sus turnos reservados dada una fecha específica (Formato fecha: 'YYYY-MM-DD')
    async listarReservasPorMedicoYFecha(idMedico: number, fechaStr: string):Promise<TurnosMedicoResponseDto[]> {
        const inicioDia = new Date(`${fechaStr}T00:00:00`);
        const finDia = new Date(`${fechaStr}T23:59:59`);

        const turnos = await this.reservaRepositorio.createQueryBuilder('reserva')
            .leftJoinAndSelect('reserva.paciente', 'paciente')
            .where('reserva.id_medico = :idMedico', { idMedico })
            .andWhere('reserva.fecha_hora BETWEEN :inicioDia AND :finDia', { inicioDia, finDia })
            .getRawMany();
        
        const turnosCorregidos = turnos.map(t => {
            const fecha = new Date(t.reserva_fecha_hora);
            fecha.setHours(fecha.getHours() - 3); // Restamos 3 hs
            return { ...t, fecha_hora: fecha };
        });


        return turnosCorregidos.map(t => {
            const turno = new TurnosMedicoResponseDto()
            turno.idReserva = t.reserva_id
            turno.valorConsulta = t.reserva_valor_consulta
            turno.estado = t.reserva_estado
            turno.idMedico = t.reserva_id_medico
            turno.idPaciente = t.reserva_id_paciente
            turno.apellidosPaciente = t.paciente_apellidos
            turno.nombresPaciente = t.paciente_nombres
            turno.emailPaciente = t.paciente_email
            turno.estadoPaciente = t.paciente_estado
            turno.rolPaciente = t.paciente_rol
            turno.fechaTurno = t.fecha_hora
            return turno
        });
    }

    // (Exclusivo Médico)

    async cambiarEstadoTurnoMedico(idReserva: number, nuevoEstado: 'atendido' | 'ausente'): Promise<{ mensaje: string }> {
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
    async cancelarReservaComoPaciente(idReserva: number, idPaciente: number): Promise<{ mensaje: string }> {
        const reserva = await this.obtenerReservaValida(idReserva);

        if (reserva.paciente.id !== idPaciente) {
            throw new BadRequestException("No tienes permiso para cancelar esta reserva.");
        }

        const hoy = new Date();
        const fechaConsulta = new Date(reserva.fecha_hora);

        // Ponemos las horas a las 00:00:00 para comparar solo días calendarios completos
        hoy.setHours(0, 0, 0, 0);
        fechaConsulta.setHours(0, 0, 0, 0);

        // Si la fecha de la consulta es menor o igual al día de hoy, se rechaza
        if (fechaConsulta.getTime() <= hoy.getTime()) {
            throw new BadRequestException("Los pacientes solo pueden cancelar turnos hasta el día anterior a la consulta.");
        }

        return await this.aplicarCancelacion(reserva);
    }

    // Administrador: Permite cancelar hasta el momento en que inicia la consulta
    async cancelarReservaComoAdmin(idReserva: number): Promise<{ mensaje: string }> {
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

    private async aplicarCancelacion(reserva: ReservaEntity): Promise<{ mensaje: string }> {
        reserva.estado = EstadosReservas.CANCELADO;
        await this.reservaRepositorio.save(reserva);
        return { mensaje: `La reserva con ID ${reserva.id} fue cancelada exitosamente.` };
    }
}
