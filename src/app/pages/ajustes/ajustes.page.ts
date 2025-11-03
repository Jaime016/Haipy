import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';

// 🔹 Firebase para login con Google
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
  mostrarLogin: boolean = false;
  correoLogin: string = '';
  contrasenaLogin: string = '';

  mostrarRegistro: boolean = false;
  nombreRegistro: string = '';
  correoRegistro: string = '';
  contrasenaRegistro: string = '';

  // 🔹 Notas de ejemplo
  notas = [
    { id: 1, titulo: 'Nota 1', contenido: 'Contenido de la nota 1' },
    { id: 2, titulo: 'Nota 2', contenido: 'Contenido de la nota 2' },
  ];

  constructor(private router: Router, private alertCtrl: AlertController) {
    // 🔹 Restaurar sesión si existe
    const usuarioGuardado = localStorage.getItem('usuarioHaipy');
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      this.nombreUsuario = user.nombre;
      this.correoUsuario = user.correo;
    }
  }

  // 🔹 Exportar / Importar notas
  exportarNotasJSON() {
    const dataStr = JSON.stringify(this.notas, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'notas_haipy.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  importarNotasJSON(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        this.notas = JSON.parse(e.target.result);
        this.mostrarAlerta('✅ Importación exitosa', 'Las notas fueron importadas correctamente.');
      } catch {
        this.mostrarAlerta('⚠️ Error', 'Hubo un problema al importar el archivo.');
      }
    };
    reader.readAsText(file);
  }

  exportarNotasPDF() {
    const doc = new jsPDF();
    let y = 10;
    this.notas.forEach((nota, index) => {
      doc.setFontSize(14);
      doc.text(`Nota ${index + 1}: ${nota.titulo}`, 10, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(nota.contenido, 10, y);
      y += 15;
    });
    doc.save('notas_haipy.pdf');
  }

  // 🔹 Imagen de perfil
  cambiarImagen() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenPerfil = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  // 🔹 Login / Registro local
  async loguearUsuario() {
    const usuarioGuardado = localStorage.getItem('usuarioHaipy');
    if (!usuarioGuardado) {
      this.mostrarAlerta('⚠️ Sin cuenta', 'Primero debes crear una cuenta.');
      return;
    }

    const user = JSON.parse(usuarioGuardado);
    if (this.correoLogin === user.correo && this.contrasenaLogin === user.contrasena) {
      this.nombreUsuario = user.nombre;
      this.correoUsuario = user.correo;
      this.mostrarLogin = false;

      await this.mostrarAlerta('🎉 Bienvenido', `Hola, ${this.nombreUsuario}!`);
      this.router.navigate(['/vista-notas']);
    } else {
      this.mostrarAlerta('❌ Error', 'Correo o contraseña incorrectos.');
    }
  }

  async crearCuenta() {
    if (this.nombreRegistro && this.correoRegistro && this.contrasenaRegistro) {
      const usuario = {
        nombre: this.nombreRegistro,
        correo: this.correoRegistro,
        contrasena: this.contrasenaRegistro,
      };

      localStorage.setItem('usuarioHaipy', JSON.stringify(usuario));

      this.nombreUsuario = usuario.nombre;
      this.correoUsuario = usuario.correo;
      this.mostrarRegistro = false;

      await this.mostrarAlerta('✅ Cuenta creada', `Bienvenido, ${this.nombreUsuario}!`);

      this.nombreRegistro = '';
      this.correoRegistro = '';
      this.contrasenaRegistro = '';

      this.router.navigate(['/vista-notas']);
    } else {
      this.mostrarAlerta('⚠️ Campos incompletos', 'Completa todos los campos para registrarte.');
    }
  }

  // 🔹 Login con Google
  async loginConGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      this.nombreUsuario = result.user.displayName || 'Usuario Google';
      this.correoUsuario = result.user.email;

      // Guardar sesión
      localStorage.setItem('usuarioHaipy', JSON.stringify({
        nombre: this.nombreUsuario,
        correo: this.correoUsuario,
      }));

      await this.mostrarAlerta('👋 Bienvenido', `Hola, ${this.nombreUsuario}!`);
      this.router.navigate(['/vista-notas']);
    } catch (error) {
      console.error(error);
      this.mostrarAlerta('⚠️ Error', 'No se pudo iniciar sesión con Google.');
    }
  }

  async cerrarSesion() {
    this.nombreUsuario = null;
    this.correoUsuario = null;
    localStorage.removeItem('usuarioHaipy');
    await this.mostrarAlerta('👋 Sesión cerrada', 'Has salido correctamente.');
  }

  // 🔹 Navegación
  abrirPapelera() { this.router.navigate(['/papelera']); }
  abrirFavoritos() { this.router.navigate(['/favoritos']); }
  abrirVistaNotas() { this.router.navigate(['/vista-notas']); }

  // 🔹 Tema oscuro
  toggleTema() {
    document.body.classList.toggle('dark', this.modoOscuro);
  }

  reportarBug() {
    window.open('mailto:soporte@haipy.com?subject=Reporte de bug Haipy&body=Describe aquí el problema...', '_blank');
  }

  // 🔹 Alerta personalizada
  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: `<div style="font-size: 15px; color: var(--ion-color-primary);">${mensaje}</div>`,
      buttons: [{ text: 'OK', cssClass: 'alert-button-confirm' }],
      cssClass: 'custom-alert',
    });
    await alert.present();
  }
}
