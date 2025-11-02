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
  mostrarLogin: boolean = false; // controla la visibilidad del formulario
  correoLogin: string = '';
  contrasenaLogin: string = '';

  constructor(private router: Router, private alertCtrl: AlertController) {}

  // 🔹 Cambiar o elegir imagen
  cambiarImagen() {
    alert('Función de selección de imagen próximamente 😎');
  }

  // 🔹 Autenticación
  iniciarSesion() {
  this.mostrarLogin = true; // el formulario aparecerá
  }
  //iniciarSesion() {
  //  this.router.navigate(['/login']);
  //} actializacion abajo
  loguearUsuario() {
    if (this.correoLogin && this.contrasenaLogin) {
      this.nombreUsuario = this.correoLogin.split('@')[0]; // ejemplo de nombre
      this.correoUsuario = this.correoLogin;
      this.mostrarLogin = false; // oculta el formulario después de “loguear”
      this.alertCtrl.create({
        header: 'Bienvenido',
        message: `Hola, ${this.nombreUsuario}!`,
        buttons: ['OK']
      }).then(alert => alert.present());
    } else {
      this.alertCtrl.create({
        header: 'Error',
        message: 'Debes completar ambos campos',
        buttons: ['OK']
      }).then(alert => alert.present());
    }
  }
  //hasta aqui
  //registrarse() {
  //  this.router.navigate(['/registro']);
  //}
  mostrarRegistro: boolean = false; // controla la visibilidad del formulario de registro
  nombreRegistro: string = '';
  correoRegistro: string = '';
  contrasenaRegistro: string = '';
  registrarse() {
    this.mostrarRegistro = true; // activa el formulario de registro
  }
  crearCuenta() {
    if (this.nombreRegistro && this.correoRegistro && this.contrasenaRegistro) {
      // Simulamos que se crea la cuenta y se loguea al usuario
      this.nombreUsuario = this.nombreRegistro;
      this.correoUsuario = this.correoRegistro;
      this.mostrarRegistro = false; // ocultamos el formulario
      alert(`Cuenta creada con éxito! Bienvenido, ${this.nombreUsuario}`);
      // Limpiamos campos
      this.nombreRegistro = '';
      this.correoRegistro = '';
      this.contrasenaRegistro = '';
    } else {
      alert('Completa todos los campos para crear la cuenta');
    }
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
