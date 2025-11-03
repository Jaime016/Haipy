import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
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
export class NotasPage implements AfterViewInit {
  notas: Nota[] = [];

  mostrarLienzo: boolean = false;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private dibujando: boolean = false;

  constructor(private notasService: NotasService, private router: Router, private alertCtrl: AlertController) {}

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
    this.notas.sort((a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0));
  }

  nuevaNota() {
    this.router.navigate(['/agregar']);
  }

  // 🔹 Protección con contraseña (solo UI)
  async protegerNota(nota: Nota, event: Event) {
    event.stopPropagation();
    const alert = await this.alertCtrl.create({
      header: 'Proteger nota',
      message: 'Escribe la contraseña para esta nota (no se guarda realmente)',
      inputs: [
        { name: 'contrasena', type: 'password', placeholder: 'Contraseña' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Aceptar', handler: (data) => { console.log('Contraseña:', data.contrasena); } }
      ]
    });
    await alert.present();
  }

  // 🔹 Lienzo de dibujo
  abrirLienzo() {
    this.mostrarLienzo = true;
    setTimeout(() => this.initCanvas(), 50); // darle tiempo a renderizar
  }

  cerrarLienzo() {
    this.mostrarLienzo = false;
  }

  ngAfterViewInit() {
    // canvas táctil/PC se inicializa cuando se abre
  }

  private initCanvas() {
    if (!this.canvas) return;
    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d')!;
    canvasEl.width = canvasEl.offsetWidth;
    canvasEl.height = canvasEl.offsetHeight;

    const startDraw = (e: any) => {
      e.preventDefault();
      this.dibujando = true;
      this.ctx.beginPath();
      const pos = this.getPos(e);
      this.ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e: any) => {
      if (!this.dibujando) return;
      const pos = this.getPos(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
    };

    const endDraw = () => {
      this.dibujando = false;
    };

    // Eventos PC
    canvasEl.addEventListener('mousedown', startDraw);
    canvasEl.addEventListener('mousemove', draw);
    canvasEl.addEventListener('mouseup', endDraw);
    canvasEl.addEventListener('mouseleave', endDraw);

    // Eventos touch
    canvasEl.addEventListener('touchstart', startDraw);
    canvasEl.addEventListener('touchmove', draw);
    canvasEl.addEventListener('touchend', endDraw);
  }

  private getPos(e: any) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  }
}
