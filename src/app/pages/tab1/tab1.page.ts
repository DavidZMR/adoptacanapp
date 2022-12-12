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

  adoptar(id: any){
    this.router.navigate(['/solicitud/'+id])
  }
  
}
