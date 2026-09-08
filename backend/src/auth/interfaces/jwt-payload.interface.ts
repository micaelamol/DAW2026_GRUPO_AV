import { RolesUsuario } from '../../usuarios/enums/roles-usuario.enum.js';

export interface JwtPayload {
  sub: number;
  email: string;
  rol: RolesUsuario;
}