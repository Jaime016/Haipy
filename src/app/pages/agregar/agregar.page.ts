import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NotasService } from '../../services/notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nota } from '../../models/note.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AgregarPage {
  titulo = '';
  contenido = '';
  editando = false;
  notaId?: number;

  constructor(private notasService: NotasService, private router: Router, private route: ActivatedRoute) {
    const nav = this.router.getCurrentNavigation();
    const nota = nav?.extras?.state?.['nota'] as Nota;

    if (nota) {
      this.editando = true;
      this.notaId = nota.id;
      this.titulo = nota.titulo;
      this.contenido = nota.contenido;
    }
  }

  guardarNota() {
    if (!this.titulo || !this.contenido) return;

    if (this.editando && this.notaId) {
      this.notasService.actualizarNota(this.notaId, this.titulo, this.contenido);
    } else {
      this.notasService.agregarNota(this.titulo, this.contenido);
    }

    this.router.navigate(['/notas']);
  }
}
