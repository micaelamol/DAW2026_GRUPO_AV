import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "../../usuarios/entities/usuario.entity.js";



@Entity({ name: 'medicos' })
export class MedicosEntity {
  // Define aquí las propiedades de la entidad MedicosEntity según tus necesidades
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario', type: 'int' })
  idUsuario: number;

  @OneToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioEntity;

  @Column({ type: 'int' })
  matricula: number;

  @Column({ name: 'valor_consulta', type: 'int' })
  valorConsulta: number;

}