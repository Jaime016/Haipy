import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NotasService } from '../../services/notes.service';
import { Nota } from '../../models/note.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class NotasPage {
  notas: Nota[] = [];

  constructor(private notasService: NotasService, private router: Router) {}

  ionViewWillEnter() {
    this.notas = this.notasService.getNotas();
  }

  editarNota(nota: Nota) {
    this.router.navigate(['/agregar'], { state: { nota } });
  }

  eliminarNota(id: number, event?: Event) {
  if (event) event.stopPropagation(); // evita que se abra la nota
  this.notasService.eliminarNota(id);
  this.notas = this.notasService.getNotas();
}

toggleFavorito(nota: Nota, event: Event) {
  event.stopPropagation(); // evita abrir la nota al marcar favorito
  this.notasService.toggleFavorito(nota.id);
  this.notas = this.notasService.getNotas();
}

  
}


