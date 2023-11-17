export interface JWTTokenDecode {
  sub: number;
  exp: number;
}

export interface AuthState {
  isAuth: boolean;
  idUser: number | null;
}

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
