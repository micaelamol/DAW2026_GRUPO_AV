import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ReservasService } from './reservas.service.js';
import { ReservasController } from './reservas.controller.js';
import { ReservaEntity } from './entities/reserva.entity.js'; 

@Module({
  imports: [
    // Registramos la entidad para que el repositorio esté disponible en el Service
    TypeOrmModule.forFeature([ReservaEntity]), 
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService], // Opcional: por si necesitas usarlo en otro módulo
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
