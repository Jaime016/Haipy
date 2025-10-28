import { Injectable } from '@angular/core';

export interface Nota {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  favorito: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private notas: Nota[] = [];

  constructor() {
    const guardadas = localStorage.getItem('notas');
    if (guardadas) {
      this.notas = JSON.parse(guardadas);
    } else {
      this.notas = [
        {
          id: 1,
          titulo: 'Bienvenido a Haipy',
          contenido: 'Esta es tu primera nota',
          fecha: new Date().toLocaleString(),
          favorito: false
        }
      ];
      this.guardarNotas();
    }
  }

  // Obtener todas las notas
  public async obtenerNotas(): Promise<Nota[]> {
    return this.notas;
  }

  // Agregar nota
  public async agregarNota(titulo: string, contenido: string, favorito: boolean = false): Promise<void> {
    const nuevaNota: Nota = {
      id: this.notas.length > 0 ? this.notas[this.notas.length - 1].id + 1 : 1,
      titulo,
      contenido,
      fecha: new Date().toLocaleString(),
      favorito
    };
    this.notas.push(nuevaNota);
    this.guardarNotas();
  }

  // Eliminar nota
  public async eliminarNota(id: number): Promise<void> {
    this.notas = this.notas.filter(n => n.id !== id);
    this.guardarNotas();
  }

  // Actualizar nota
  public async actualizarNota(id: number, titulo: string, contenido: string, favorito: boolean = false): Promise<void> {
    const index = this.notas.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notas[index] = {
        ...this.notas[index],
        titulo,
        contenido,
        favorito,
        fecha: new Date().toLocaleString()
      };
      this.guardarNotas();
    }
  }

  // Guardar en localStorage
  public guardarNotas(): void {
    localStorage.setItem('notas', JSON.stringify(this.notas));
  }

  // Toggle favorito
  public async toggleFavorito(id: number): Promise<void> {
    const nota = this.notas.find(n => n.id === id);
    if (nota) {
      nota.favorito = !nota.favorito;
      this.guardarNotas();
    }
  }
}
