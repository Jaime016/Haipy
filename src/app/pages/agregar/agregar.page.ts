import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotasService, Nota } from '../../services/notes.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AgregarPage {
  titulo: string = '';
  contenido: string = '';
  modoEdicion: boolean = false;
  idNota: number | null = null;

  constructor(private notasService: NotasService, private router: Router) {
    // Revisar si viene nota para edición
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state && nav.extras.state['nota']) {
      const nota = nav.extras.state['nota'] as Nota;
      this.titulo = nota.titulo;
      this.contenido = nota.contenido;
      this.idNota = nota.id;
      this.modoEdicion = true;
    }
  }

  async guardarNota() {
    if (!this.titulo || !this.contenido) return;

    if (this.modoEdicion && this.idNota !== null) {
      await this.notasService.actualizarNota(this.idNota, this.titulo, this.contenido);
    } else {
      await this.notasService.agregarNota(this.titulo, this.contenido);
    }

    this.router.navigate(['/notas']);
  }
}