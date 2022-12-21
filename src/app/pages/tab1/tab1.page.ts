import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PerrosService } from 'src/app/services/perros.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  date = new Date;
  fecha =this.date.toLocaleDateString()

  idUsuario = localStorage.getItem('id')
  perros: any;
  constructor(
    private alertController: AlertController,
    private perrosService: PerrosService,
    private router: Router
  ) {}
  ngOnInit() {
    this.perrosService.getPerrosAdopcion().subscribe((res)=>{
      if(res.intResponse === 200){
        this.perros = res.Result
        this.perros = this.perros.perros
      }else{

      }
    })
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.perrosService.getPerrosAdopcion().subscribe((res)=>{
        if(res.intResponse === 200){
          this.perros = res.Result
          this.perros = this.perros.perros
        }else{
  
        }
      })
      event.target.complete();
    }, 2000);
  };

  async presentAlert(id: any) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      backdropDismiss: false,
      header: 'Adoptar',
      subHeader: 'Estas seguro de poderle dar una vida digna a este perrito?',
      message: 'Si es asi continua con el proceso de adopcion',
      buttons: [
        {
          text: 'Adoptar',
          cssClass: 'alert-button-confirm',
          handler: () => {this.adoptar(id)}
        },
        {
        text: 'Cancelar',
        cssClass: 'alert-button-cancel',
      },
      ]
    });

    await alert.present();
  }
  async presentAlertAdoptar() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      backdropDismiss: false,
      header: 'Solicitud enviada',
      subHeader: 'La solicitud para adoptar a este perrito esta en proceso',
      message: 'espera el correo con la fecha y lugar de tu cita.',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
          
        }
      
      ]
    });

    await alert.present();
  }

  adoptar(id: any){
    console.log(this.fecha)
    let data ={
      'intIdUsuario':this.idUsuario,
      'intIdPerro': id,
      'strFecha': this.fecha,
      'strStatus': 'pendiente'
    }
    this.perrosService.setSolicitudAdopcion(data).subscribe((res)=>{
      if(res.intResponse === 200){
        this.presentAlertAdoptar()
      }
    })
  }
  
}
