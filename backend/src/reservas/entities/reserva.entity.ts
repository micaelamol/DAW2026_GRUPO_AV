import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MedicoEntity } from '../../usuarios/entities/medico.entity.js';
import { UsuarioEntity } from '../../usuarios/entities/usuario.entity.js';
import { EstadosReservas } from '../enums/estados-reservas.enum.js';

@Entity({ name: 'reservas' })
export class ReservaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MedicoEntity, { nullable: false })
  @JoinColumn({ name: 'id_medico' })
  medico: MedicoEntity;

  // Se cambió 'datetime' a 'timestamp' porque PostgreSQL no soporta 'datetime'
  @Column({ type: 'timestamp', nullable: false })
  fecha_hora: Date;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'id_paciente' })
  paciente: UsuarioEntity;

  // Se usa 'integer' que es el estándar nativo en Postgres
  @Column({ name: 'valor_consulta', type: 'integer' })
  valor_consulta: number;

  @Column({ type: 'enum', enum: EstadosReservas, nullable: false })
  estado: EstadosReservas;
}


// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { MedicoEntity } from '../../usuarios/entities/medico.entity.js';
// import { UsuarioEntity } from '../../usuarios/entities/usuario.entity.js';
// import { EstadosReservas } from '../enums/estados-reservas.enum.js';

// @Entity({ name: 'reservas' })
// export class ReservaEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(()=> MedicoEntity, { nullable:false})
//   @JoinColumn({name:'id_medico'})
//   medico: MedicoEntity;

//   @Column ({ type: 'datetime', nullable:false })
//   fecha_hora: Date;

//   @ManyToOne(()=> UsuarioEntity, { nullable:false })
//   @JoinColumn({name:'id_paciente'})
//   paciente:UsuarioEntity;

//   @Column({ name: 'valor_consulta', type: 'int' })
//   valor_consulta: number;

//   @Column({type:'enum', enum:EstadosReservas,nullable:false})
//   estado:EstadosReservas;
// }