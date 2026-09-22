import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from './reservas.controller.js';
import { ReservasService } from './reservas.service.js';
import { ReservaEntity } from './entities/reserva.entity.js';
import { MedicoEntity } from '../usuarios/entities/medico.entity.js';

@Module({
  imports: [
    // Registramos la entidad para que el repositorio esté disponible en el Service
    TypeOrmModule.forFeature([ReservaEntity]), 
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
  imports: [TypeOrmModule.forFeature([ReservaEntity, MedicoEntity])],
})
export class ReservasModule {}

// import { Module } from '@nestjs/common';
// import { ReservasController } from './reservas.controller.js';
// import { ReservasService } from './reservas.service.js';

// @Module({
//   controllers: [ReservasController],
//   providers: [ReservasService]
// })
// export class ReservasModule {}
