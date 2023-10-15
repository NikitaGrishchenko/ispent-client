export interface JWTTokenDecode {
  sub: number;
  exp: number;
}

export interface AuthState {
  isAuth: boolean;
  idUser: number | null;
}
