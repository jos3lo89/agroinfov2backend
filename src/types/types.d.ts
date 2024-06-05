export interface Payload {
  id: string;
  correo: string;
  rol: string;
}

export interface Decoded extends Payload {
  iat: number;
  exp: number;
}