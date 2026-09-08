import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { EstadosUsuario } from '../usuarios/enums/estados-usuario.enum.js';
import { RolesUsuario } from '../usuarios/enums/roles-usuario.enum.js';
import { MedicoEntity } from '../usuarios/entities/medico.entity.js';
import { UsuarioEntity } from '../usuarios/entities/usuario.entity.js';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(MedicoEntity)
    private readonly medicoRepository: Repository<MedicoEntity>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const total = await this.usuarioRepository.count();
    if (total > 0) {
      this.logger.log('Usuarios ya existentes, se omite el seeding');
      return;
    }

    const claveAdmin = await bcrypt.hash('Admin123!', 10);
    const claveMedico = await bcrypt.hash('Medico123!', 10);
    const clavePaciente = await bcrypt.hash('Paciente123!', 10);
    const claveBaja = await bcrypt.hash('Baja12345!', 10);

    await this.usuarioRepository.save(
      this.usuarioRepository.create({
        documento: '30000001',
        apellidos: 'García',
        nombres: 'Ana',
        email: 'admin@clinica.com',
        clave: claveAdmin,
        estado: EstadosUsuario.ACTIVO,
        rol: RolesUsuario.ADMINISTRADOR,
      }),
    );
    await this.usuarioRepository.save(
      this.usuarioRepository.create({
        documento: '30000002',
        apellidos: 'Fernández',
        nombres: 'Carlos',
        email: 'medico@clinica.com',
        clave: claveMedico,
        estado: EstadosUsuario.ACTIVO,
        rol: RolesUsuario.MEDICO,
      }),
    );
    await this.usuarioRepository.save(
      this.usuarioRepository.create({
        documento: '30000003',
        apellidos: 'López',
        nombres: 'Lucía',
        email: 'paciente@clinica.com',
        clave: clavePaciente,
        estado: EstadosUsuario.ACTIVO,
        rol: RolesUsuario.PACIENTE,
      }),
    );
    await this.usuarioRepository.save(
      this.usuarioRepository.create({
        documento: '30000004',
        apellidos: 'Díaz',
        nombres: 'Pedro',
        email: 'baja@clinica.com',
        clave: claveBaja,
        estado: EstadosUsuario.BAJA,
        rol: RolesUsuario.MEDICO,
      }),
    );

    const medicoUsuario = await this.usuarioRepository.findOneBy({
      email: 'medico@clinica.com',
    });
    if (medicoUsuario) {
      await this.medicoRepository.save(
        this.medicoRepository.create({
          idUsuario: medicoUsuario.id,
          matricula: 12345,
          valorConsulta: 15000,
        }),
      );
    }

    this.logger.log(
      `Se crearon usuarios de ejemplo. ` +
        `Admin: admin@clinica.com / Admin123! | ` +
        `Médico: medico@clinica.com / Medico123! | ` +
        `Paciente: paciente@clinica.com / Paciente123! | ` +
        `Baja: baja@clinica.com / Baja12345!`,
    );
  }
}