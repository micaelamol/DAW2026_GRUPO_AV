import { ApiProperty } from '@nestjs/swagger';
import { UsuarioResponseDto } from './usuario-response.dto.js';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token JWT de acceso',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbCI6IkFETUlOSVNUUkFET1IiLCJpYXQiOjE3MTc2MDAsImV4cCI6MTcxNzYzIn0.firma',
  })
  accessToken: string;

  @ApiProperty({ type: UsuarioResponseDto })
  usuario: UsuarioResponseDto;
}