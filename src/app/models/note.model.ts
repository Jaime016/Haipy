export interface Nota {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  favorito?: boolean; // nuevo campo
}
