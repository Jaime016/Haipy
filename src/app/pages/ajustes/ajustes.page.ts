import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajustes',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage {
  imagenPerfil: string | null = null;
  nombreUsuario: string | null = null;
  correoUsuario: string | null = null;
  modoOscuro = false;

  constructor(private router: Router, private alertCtrl: AlertController) {}

  // 🔹 Cambiar o elegir imagen
  cambiarImagen() {
    alert('Función de selección de imagen próximamente 😎');
  }

  // 🔹 Autenticación
  iniciarSesion() {
    this.router.navigate(['/login']);
  }

  registrarse() {
    this.router.navigate(['/registro']);
  }

  loginConGoogle() {
    alert('Inicio de sesión con Google próximamente 🌐');
  }

  cerrarSesion() {
    this.nombreUsuario = null;
    this.correoUsuario = null;
    alert('Sesión cerrada correctamente ✅');
  }

  // 🔹 Navegación
  abrirPapelera() {
    this.router.navigate(['/papelera']);
  }

  abrirFavoritos() {
    this.router.navigate(['/favoritos']);
  }

  abrirVistaNotas() {
    this.router.navigate(['/vista-notas']);
  }

  // 🔹 Tema oscuro
  toggleTema() {
    document.body.classList.toggle('dark', this.modoOscuro);
    localStorage.setItem('modoOscuro', String(this.modoOscuro));
  }
}
