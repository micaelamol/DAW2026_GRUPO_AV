import { Injectable, NotFoundException } from "@nestjs/common";
import { MedicosEntity } from "../usuarios/entities/medico.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicosResponseDto } from "./dto/medicos-response.dto.js";

@Injectable()
export class MedicosService {
  
  constructor(@InjectRepository(MedicosEntity)
  private readonly medicosRepository: Repository<MedicosEntity>) { }

  async listarMedicos(): Promise<MedicosResponseDto[]> {
    const medicos = await this.medicosRepository.createQueryBuilder('medico')
      .leftJoin('medico.usuario', 'usuario')
      .addSelect(['usuario.nombres', 'usuario.apellidos'])
      .getMany();

    return medicos.map(medico => ({
      idMedico: medico.id,
      idUsuario: medico.idUsuario,
      nombre: medico.usuario.nombres,
      apellido: medico.usuario.apellidos,
      matricula: medico.matricula,
      valorConsulta: medico.valorConsulta
    }));
  }

  async actualizarValorConsulta(idMedico: number, nuevoValor: number): Promise<MedicosResponseDto> {
    const medico = await this.medicosRepository.findOne({
      where: { id: idMedico },
      relations: { usuario: true },
    });

    if (!medico) {
      throw new NotFoundException(`Médico con ID ${idMedico} no encontrado.`);
    }

    medico.valorConsulta = nuevoValor;
    const medicoActualizado = await this.medicosRepository.save(medico);

    return {
      idMedico: medicoActualizado.id,
      idUsuario: medicoActualizado.idUsuario,
      nombre: medicoActualizado.usuario?.nombres ?? '',
      apellido: medicoActualizado.usuario?.apellidos ?? '',
      matricula: medicoActualizado.matricula,
      valorConsulta: medicoActualizado.valorConsulta,
    };
  }
}
