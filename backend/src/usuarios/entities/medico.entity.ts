import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from './usuario.entity.js';

@Entity('medicos')
export class MedicoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario', type: 'int' })
  idUsuario: number;

  @OneToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario?: UsuarioEntity;

  @Column({ type: 'int' })
  matricula: number;

  @Column({ name: 'valor_consulta', type: 'int' })
  valorConsulta: number;
}