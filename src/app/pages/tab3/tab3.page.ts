import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { PerrosService } from 'src/app/services/perros.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  idUsuario: any = localStorage.getItem('id')
  id: number;
  numero: number;
  descripcion: string;
  direccion: string;
  foto: string;
  fotoBase64: any;
  date = new Date;
  fecha =this.date.toLocaleDateString()
  

  constructor(
    private alertController: AlertController,
    private perrosService: PerrosService,
    private router: Router
  ) {}
  ngOnInit() {
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
  reportar(){
    if(this.numero === 0 || this.numero === undefined || this.descripcion === '' || this.descripcion === undefined || this.direccion === '' || this.direccion === undefined || this.foto === '' || this.foto === undefined ){
      this.presentAlertError()
    }else{
      this.presentAlertReportar()
    }
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };
  send(){
    this.idUsuario = parseInt(this.idUsuario)
    let data = {
      'intIdUsuario': this.idUsuario,
      'intNumeroPerros': this.numero,
      'strDescripcion': this.descripcion,
      'strDireccion': this.direccion,
      'strFoto': this.foto,
      'strStatus': 'activo',
      'strFecha': this.fecha
    }
    this.perrosService.report(data).subscribe(res => {
      if (res.intResponse === 200) {
        this.router.navigate(['/tabs'])
      } else {
        this.presentAlertErrorReport();
      }
    });
  }

  async presentAlertError() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'Completa los campos',
      message: 'todos los campos son requeridos.',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
        },
      ]
    });

    await alert.present();
  }
  async presentAlertErrorReport() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'No se completo el reporte',
      message: 'Intenta nuevamente.',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
        },
      ]
    });

    await alert.present();
  }
  async presentAlertReportar() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      backdropDismiss: false,
      header: 'Reportar',
      subHeader: 'Es importante que sepas que alguien puede invertir su tiempo atendiendo este reporte',
      message: 'Si estas conciente de ello da click en reportar.',
      buttons: [
        {
          text: 'Reportar',
          handler: () => {this.send()},
          cssClass: 'alert-button-confirm',
        },
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
        },
      ]
    });

    await alert.present();
  }

}
