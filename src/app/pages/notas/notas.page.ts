import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NotasService, Nota } from '../../services/notes.service';
import { Router } from '@angular/router';

@Component({
  imports: [IonicModule, CommonModule],
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
  standalone: true,
})
export class NotasPage {
  notas: Nota[] = [];

  constructor(private notasService: NotasService, private router: Router) {}

  async ionViewWillEnter() {
    this.notas = await this.notasService.obtenerNotas();
    this.ordenarNotas();
  }

  async eliminarNota(nota: Nota, event?: Event) {
    event?.stopPropagation(); // Evita abrir la nota al hacer click en eliminar
    await this.notasService.eliminarNota(nota.id);
    this.notas = await this.notasService.obtenerNotas();
    this.ordenarNotas();
  }

  editarNota(nota: Nota) {
    this.router.navigate(['/agregar'], { state: { nota } });
  }

  async toggleFavorito(nota: Nota, event: Event) {
    event.stopPropagation();
    await this.notasService.toggleFavorito(nota.id);
    this.notas = await this.notasService.obtenerNotas();
    this.ordenarNotas();
  }

  ordenarNotas() {
    // Favoritos primero
    this.notas.sort((a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0));
  }

  // 🔹 Agregamos este método que faltaba
  nuevaNota() {
    this.router.navigate(['/agregar']);
  }
}
