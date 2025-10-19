import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NotasService } from '../services/notes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private notasService: NotasService, private router: Router) {}

  guardarNota() {
    if (this.titulo && this.contenido) {
      this.notasService.agregarNota(this.titulo, this.contenido);
      this.router.navigate(['/notas']);
    }
  }
}
