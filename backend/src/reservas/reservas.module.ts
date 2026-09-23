import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from './reservas.controller.js';
import { ReservasService } from './reservas.service.js';
import { ReservaEntity } from './entities/reserva.entity.js';
import { MedicoEntity } from '../usuarios/entities/medico.entity.js';


@Module({
  imports: [
    TypeOrmModule.forFeature([
    ReservaEntity,
    MedicoEntity,
    ]),
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}