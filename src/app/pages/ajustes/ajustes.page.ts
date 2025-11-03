import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

  // 🔹 Notas de ejemplo
  notas = [
    { id: 1, titulo: 'Nota 1', contenido: 'Contenido de la nota 1' },
    { id: 2, titulo: 'Nota 2', contenido: 'Contenido de la nota 2' },
  ];

  constructor(private router: Router, private alertCtrl: AlertController) {}

  // 🔹 Cambiar o elegir imagen desde galería
  async cambiarImagen() {
    try {
      const foto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos, // Solo galería
      });

      // Asignación segura
      if (foto.dataUrl) {
        this.imagenPerfil = foto.dataUrl;
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen:', error);
    }
  }

  // 🔹 Exportar notas a JSON
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

  // 🔹 Importar notas desde JSON
  importarNotasJSON(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        this.notas = JSON.parse(e.target.result);
        alert('Notas importadas correctamente ✅');
      } catch (err) {
        alert('Error al importar el archivo ⚠️');
      }
    };
    reader.readAsText(file);
  }

  // 🔹 Exportar notas a PDF
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

  // 🔹 Autenticación
  iniciarSesion() {
    this.mostrarLogin = true;
  }

  loguearUsuario() {
    if (this.correoLogin && this.contrasenaLogin) {
      this.nombreUsuario = this.correoLogin.split('@')[0]; // ejemplo de nombre
      this.correoUsuario = this.correoLogin;
      this.mostrarLogin = false; // oculta el formulario después de loguear
      this.alertCtrl.create({
        header: 'Bienvenido',
        message: `Hola, ${this.nombreUsuario}!`,
        buttons: ['OK'],
      }).then(alert => alert.present());
    } else {
      this.alertCtrl.create({
        header: 'Error',
        message: 'Debes completar ambos campos',
        buttons: ['OK'],
      }).then(alert => alert.present());
    }
  }

  mostrarRegistro: boolean = false; // controla visibilidad del registro
  nombreRegistro: string = '';
  correoRegistro: string = '';
  contrasenaRegistro: string = '';

  registrarse() {
    this.mostrarRegistro = true;
  }

  crearCuenta() {
    if (this.nombreRegistro && this.correoRegistro && this.contrasenaRegistro) {
      this.nombreUsuario = this.nombreRegistro;
      this.correoUsuario = this.correoRegistro;
      this.mostrarRegistro = false;
      alert(`Cuenta creada con éxito! Bienvenido, ${this.nombreUsuario}`);
      // Limpiar campos
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
    if (this.modoOscuro) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  // 🔹 Reportar bug
  reportarBug() {
    window.open(
      'mailto:soporte@haipy.com?subject=Reporte de bug Haipy&body=Describe aquí el problema...',
      '_blank'
    );
  }
}
