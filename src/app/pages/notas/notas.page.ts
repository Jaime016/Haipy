import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class NotasPage implements AfterViewInit {
  notas: Nota[] = [];

  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  canvasAbierto: boolean = false;

  constructor(private notasService: NotasService, private router: Router) {}

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

  // ✏️ Funciones para el canvas
  abrirCanvas() {
    this.canvasAbierto = true;
    setTimeout(() => this.inicializarCanvas(), 50); // Esperar a que se renderice
  }

  cerrarCanvas() {
    this.canvasAbierto = false;
  }

  guardarDibujo() {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const dataUrl = canvas.toDataURL('image/png');
    console.log('Dibujo guardado:', dataUrl);
    this.cerrarCanvas();
  }

  ngAfterViewInit() {
    // Nada aún, canvas se inicializa al abrirlo
  }

  inicializarCanvas() {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpiar canvas al abrir
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ajustar tamaño del canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    let dibujando = false;

    const start = (x: number, y: number) => {
      dibujando = true;
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (x: number, y: number) => {
      if (!dibujando) return;
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stop = () => (dibujando = false);

    // Desktop
    canvas.addEventListener('mousedown', (e) => start(e.offsetX, e.offsetY));
    canvas.addEventListener('mousemove', (e) => draw(e.offsetX, e.offsetY));
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('mouseleave', stop);

    // Mobile
    canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      start(touch.clientX - rect.left, touch.clientY - rect.top);
      e.preventDefault();
    });
    canvas.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      draw(touch.clientX - rect.left, touch.clientY - rect.top);
      e.preventDefault();
    });
    canvas.addEventListener('touchend', stop);
  }
}
