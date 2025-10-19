import { Injectable } from '@angular/core';
import { Nota } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private notas: Nota[] = [
    { id: 1, titulo: 'Bienvenido a Haipy', contenido: 'Esta es tu primera nota 🪶', fecha: new Date().toLocaleString(), favorito: false }
  ];

  getNotas(): Nota[] {
    return this.notas;
  }

  agregarNota(titulo: string, contenido: string): void {
    const nueva: Nota = {
      id: this.notas.length + 1,
      titulo,
      contenido,
      fecha: new Date().toLocaleString(),
      favorito: false
    };
    this.notas.push(nueva);
  }

  eliminarNota(id: number): void {
    this.notas = this.notas.filter(n => n.id !== id);
  }

  actualizarNota(id: number, titulo: string, contenido: string): void {
    const nota = this.notas.find(n => n.id === id);
    if (nota) {
      nota.titulo = titulo;
      nota.contenido = contenido;
      nota.fecha = new Date().toLocaleString();
    }
  }

  toggleFavorito(id: number): void {
    const nota = this.notas.find(n => n.id === id);
    if (nota) nota.favorito = !nota.favorito;
  }
}
