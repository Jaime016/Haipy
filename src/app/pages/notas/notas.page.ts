import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NotasService, Nota } from '../../services/notes.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
  standalone: true,
})
export class NotasPage {
  notas: Nota[] = [];
  mostrandoFormulario = false;

  nueva = {
    titulo: '',
    contenido: ''
  };

  constructor(private notasService: NotasService) {}

  async ionViewWillEnter() {
    this.notas = await this.notasService.obtenerNotas();
    this.ordenarNotas();
  }

  async eliminarNota(nota: Nota, event?: Event) {
    event?.stopPropagation();
    await this.notasService.eliminarNota(nota.id);
    this.notas = await this.notasService.obtenerNotas();
    this.ordenarNotas();
  }

  async toggleFavorito(nota: Nota, event: Event) {
    event.stopPropagation();
    await this.notasService.toggleFavorito(nota.id);
    this.notas = await this.notasService.obtenerNotas();
    this.ordenarNotas();
  }

  ordenarNotas() {
    this.notas.sort((a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0));
  }

  // Mostrar el formulario
  mostrarFormulario() {
    this.mostrandoFormulario = true;
  }

  // Guardar nueva nota
  async guardarNuevaNota() {
    if (this.nueva.titulo && this.nueva.contenido) {
      await this.notasService.agregarNota(this.nueva.titulo, this.nueva.contenido);
      this.notas = await this.notasService.obtenerNotas();
      this.ordenarNotas();
      this.nueva = { titulo: '', contenido: '' };
      this.mostrandoFormulario = false;
    }
  }

  // Cancelar la creación
  cancelarNuevaNota() {
    this.nueva = { titulo: '', contenido: '' };
    this.mostrandoFormulario = false;
  }
}
