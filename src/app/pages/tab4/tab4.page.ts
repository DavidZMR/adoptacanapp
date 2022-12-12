import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PerrosService } from 'src/app/services/perros.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  reporte: any;
  campo: boolean;
  idReporte: any;
  constructor(
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private perrosService: PerrosService
  ) { }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      let id = localStorage.getItem('id')
      this.perrosService.getReportInCurso(id).subscribe(res => {
      if(res.intResponse === 203){
        this.campo = false
      }
      if (res.intResponse === 200) {
        this.reporte = res.Result
        this.reporte = this.reporte.reporte
        this.campo = true
      } else {
        
      }
    });
      event.target.complete();
    }, 2000);
  };

  ngOnInit() {
    let id = localStorage.getItem('id')
    this.perrosService.getReportInCurso(id).subscribe(res => {
      if(res.intResponse === 203){
        this.campo = false
      }
      if (res.intResponse === 200) {
        this.reporte = res.Result
        this.reporte = this.reporte.reporte
        this.campo = true
      } else {
        
      }
    });
  }

  async presentAlertResguardar(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      backdropDismiss: false,
      header: 'Resguardar',
      subHeader: 'Al momento de elegir resguardar te llegara un correo con los datos de la perrera que se hara cargo de ir por el perrito',
      message: 'Si es asi haz click en Resguardar y espera el correo',
      buttons: [
        {
          text: 'Resguardar',
          cssClass: 'alert-button-confirm',
          handler: () => {this.changeStatus('resguardado',id)},
        },
        {
        text: 'Cancelar',
        cssClass: 'alert-button-cancel',
      },
      ]
    });

    await alert.present();
  }
  async presentAlertError() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'Hubo un error en el procedimiento.',
      message: 'Intentalo nuevamente',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
        },
        
      ]
    });

    await alert.present();
  }

  async presentAlertAdoptar(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      backdropDismiss: false,
      header: 'Adoptar',
      subHeader: 'Estas seguro de poderle dar una vida digna a este perrito?',
      message: 'Si es asi haz click en adoptar',
      buttons: [
        {
          text: 'Adoptar',
          cssClass: 'alert-button-confirm',
          handler: () => {this.changeStatus('adoptado',id)},
        },
        {
        text: 'Cancelar',
        cssClass: 'alert-button-cancel',
      },
      ]
    });

    await alert.present();
  }

  changeStatus(strStatus: string, id: number){
    console.log(id)
    let data = {
      'strStatus': strStatus,
      'intIdReporte': id
    }
    this.perrosService.changeStatus(data).subscribe(res => {
      if (res.intResponse === 200) {
        this.campo = false
      } else {
        this.presentAlertError()
      }
    });
  }

}
