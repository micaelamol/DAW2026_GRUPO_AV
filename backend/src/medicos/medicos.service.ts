import { Injectable } from "@nestjs/common";
import { MedicosEntity } from "./entities/medicos.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { MedicosResponseDto } from "./dto/medicos-response.dto.js";




@Injectable()
export class MedicosService {
  
  constructor(@InjectRepository(MedicosEntity)
  private readonly medicosRepository: Repository<MedicosEntity>) { }

  async listarMedicos(): Promise<MedicosResponseDto[]> {

    const medicos = await this.medicosRepository.createQueryBuilder('medico')
      .leftJoin('medico.usuario', 'usuario')
      .addSelect(['usuario.nombres', 'usuario.apellidos']) // solo estas columnas de usuario
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
}
