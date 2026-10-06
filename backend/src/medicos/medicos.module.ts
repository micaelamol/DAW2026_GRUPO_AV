import { Module } from "@nestjs/common";
import { MedicosService } from "./medicos.service.js";
import { MedicosController } from "./medicos.controller.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedicosEntity } from "./entities/medicos.entity.js";
import { UsuarioEntity } from "../usuarios/entities/usuario.entity.js";



@Module({
  imports:[TypeOrmModule.forFeature([MedicosEntity,UsuarioEntity])],
  controllers:[MedicosController],
  providers: [MedicosService],

})
export class MedicosModule {}