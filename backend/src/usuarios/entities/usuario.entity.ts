import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadosUsuario } from '../enums/estados-usuario.enum.js';
import { RolesUsuario } from '../enums/roles-usuario.enum.js';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  documento: string;

  @Column({ type: 'text' })
  apellidos: string;

  @Column({ type: 'text' })
  nombres: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  clave: string;

  @Column({ type: 'enum', enum: EstadosUsuario, enumName: 'estados_usuarios' })
  estado: EstadosUsuario;

  @Column({ type: 'enum', enum: RolesUsuario, enumName: 'roles_usuarios' })
  rol: RolesUsuario;
}