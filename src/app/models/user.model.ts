export interface User {
  id: number;
  email: string;
  password?: string; // solo para registro
  name?: string;
  favorites?: number[];
}