import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  loginForm: any;
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
    private fb: FormBuilder,
    private authService: AuthService

  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false)
    this.loginForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required],
      correo:['', Validators.required], 
      password: ['', Validators.required, Validators.minLength(8)],
      password2:['', Validators.required, Validators.minLength(8)]  
    });
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
    this.nombres = this.loginForm.get('nombres').value;
    this.apellidos = this.loginForm.get('apellidos').value;
    this.edad = this.loginForm.get('edad').value;
    this.direccion =  this.loginForm.get('direccion').value;
    this.correo = this.loginForm.get('correo').value;
    this.password = this.loginForm.get('password').value;
    this.password2 = this.loginForm.get('password2').value;
    if(this.password === this.password2){
      console.log(this.foto)
      if(this.foto === ''){
        this.presentAlertPhoto();
      }else{
        let data = {
          'strNombres': this.nombres,
          'strApellidos': this.apellidos,
          'intEdad': this.edad,
          'strDireccion': this.direccion,
          'strCorreo': this.correo,
          'strPassword': this.password,
          'strFotoBase64': this.foto,
          'strtipoUsuario': 'usuario',
          'strStatus': 'pendiente'
        }
        console.log(data)
        this.authService.registerUser(data).subscribe(res => {
          if (res.intResponse === 200) {
            this.router.navigate(['/login'])
          } else {
            this.presentAlertError();
          }
        });
      }
    }else{
      this.presentAlertPassword();
    }
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
