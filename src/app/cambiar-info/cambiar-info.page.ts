import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-cambiar-info',
  templateUrl: './cambiar-info.page.html',
  styleUrls: ['./cambiar-info.page.scss'],
})
export class CambiarInfoPage implements OnInit {
  id = localStorage.getItem('id')
  usuario: any;
  nombres: string;
  apellidos: string;
  edad: number;
  direccion: string;
  correo: string;
  password: string;
  password2: string; 
  fotoBase64: any;
  foto: string = '';
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private authService: AuthService,
    private userService: UsuariosService

  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false)
    
    this.userService.getDatos(this.id).subscribe((res)=>{
      if(res.intResponse === 200){
        this.usuario = res.Result
        this.usuario = this.usuario.usuario[0]
        this.nombres = this.usuario.nombres
        this.apellidos = this.usuario.apellidos
        this.edad = this.usuario.edad
        this.direccion = this.usuario.direccion
        this.correo = this.usuario.correo
        this.foto = this.usuario.foto
      }
    })
    
  }

  addPhotoToGallery() {
    Camera.getPhoto({
      quality: 100,
      source: CameraSource.Prompt,
      correctOrientation: true,
      allowEditing: false,
      resultType: CameraResultType.Base64
    })
    .then(image => {
        this.fotoBase64 = image.base64String; // VAR TO DISPLAY IN HTML
        this.foto = "data:image/png;base64,"+this.fotoBase64
    })
  }

  submit(){
    let data = {
      'intId': this.id,
      'strNombres': this.nombres,
      'strApellidos': this.apellidos,
      'intEdad': this.edad,
      'strDireccion': this.direccion,
      'strCorreo': this.correo,
      'strFotoBase64': this.foto,
    }
    this.userService.editUser(data).subscribe(res => {
      if (res.intResponse === 200) {
        this.router.navigate(['/tabs'])
      } else {
        this.presentAlertError();
      }
    });
        
     
  }
  async presentAlertPassword() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'Las contraseñas no coinciden',
      message: 'Verifique contraseñas.',
      buttons: [
        {
        text: 'Ok',
        cssClass: 'alert-button-cancel',
      },
      ]
    });

    await alert.present();
  }
  async presentAlertError() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'No se pudo registrar usuario',
      message: 'Intente mas tarde.',
      buttons: [
        {
        text: 'Ok',
        cssClass: 'alert-button-cancel',
      },
      ]
    });

    await alert.present();
  }
  async presentAlertPhoto() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'No hay foto',
      message: 'Suba la foto de su credencial.',
      buttons: [
        {
        text: 'Ok',
        cssClass: 'alert-button-cancel',
      },
      ]
    });

    await alert.present();
  }
}
