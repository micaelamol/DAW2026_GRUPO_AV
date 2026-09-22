import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto.js';
import { ReservaEntity } from './entities/reserva.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadosReservas } from './enums/estados-reservas.enum.js';
import { MedicoEntity } from '../usuarios/entities/medico.entity.js';

@Injectable()
export class ReservasService {
    
    constructor(@InjectRepository(ReservaEntity) private reservaRepositorio: Repository<ReservaEntity>,
    @InjectRepository(MedicoEntity) private medicoRepositorio: Repository<MedicoEntity>) {}


    async crearReserva(dto: CreateReservaDto) { 
        const fechaReserva = new Date(dto.fecha_hora);
        
        this.validarFechaReserva(fechaReserva);
        const reservaDuplicada= await this.reservaRepositorio.findOne({where:{ medico:{ id: dto.id_medico },fecha_hora: fechaReserva,estado:EstadosReservas.ACTIVO}})
        const medico=await this.medicoRepositorio.findOne({where:{id:dto.id_medico}})

        if(reservaDuplicada) //da null si la fecha esta libre
        {
            throw new BadRequestException("El turno a reservar ya esta ocupado, elije otro horario/fecha.")
        } if (!medico){
            throw new BadRequestException ("El medico selecionado no existe.")
        }
        const precioCongelado=medico.valorConsulta;

        const nuevaReserva=this.reservaRepositorio.create({
            fecha_hora:fechaReserva,
            estado:EstadosReservas.ACTIVO,
            valor_consulta:precioCongelado,
            medico:{id:dto.id_medico},
            paciente:{id:dto.id_paciente}
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
        const diferenciaMiliseg= fechaReserva.getTime() - hoy.getTime();
        const diferenciaDias = diferenciaMiliseg / (1000 * 60 * 60 * 24);

        if (diferenciaDias < 0) {
            throw new BadRequestException("No se pueden solicitar turnos en una fecha que ya paso.");
        }
        if (diferenciaDias > 30) {
            throw new BadRequestException("No se pueden hacer reservas con más de 30 días de anticipación.");
        }
    }

    async listarReservas() {
    return await this.reservaRepositorio.find({
      relations:{ medico:true, paciente:true} 
    });
  }

  async cancelarReserva(id: number) {
    const reserva = await this.reservaRepositorio.findOne({ 
        where: { id } 
    });

    if (!reserva) {
      throw new BadRequestException("La reserva que intentas cancelar no existe.");
    }

    if (reserva.estado === EstadosReservas.CANCELADO) {
      throw new BadRequestException("Esta reserva ya esta cancelada.");
    }

    reserva.estado = EstadosReservas.CANCELADO;
    
    // bd guardado
    await this.reservaRepositorio.save(reserva);

    return { mensaje: `La reserva con ID ${id} fue cancelada exitosamente.` };
  }
}