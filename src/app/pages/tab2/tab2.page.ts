import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PerrosService } from 'src/app/services/perros.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  idUsuario = localStorage.getItem('id')
  
  reportes: any;
  constructor(
    private alertController: AlertController,
    private perrosService: PerrosService,
    private router: Router
  ) {}

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.perrosService.getRepors().subscribe(res => {
        if (res.intResponse === 200) {
          this.reportes = res.Result
          this.reportes = this.reportes.reportes
          console.log(this.reportes)
        } else {
          
        }
      });
      event.target.complete();
    }, 2000);
  };
  ngOnInit() {
    
    this.perrosService.getRepors().subscribe(res => {
      if (res.intResponse === 200) {
        this.reportes = res.Result
        this.reportes = this.reportes.reportes
      } else {
        
      }
    });
  }

  atender(id: number){
    this.perrosService.atenderReport(id, this.idUsuario).subscribe(res => {
      let mensaje = res.strAnswer
      if (res.intResponse === 200) {
        let data = res.Result
        data = data.atendiendo
        this.router.navigate(['/tabs/tab4'])
        
      } else {
        console.log(mensaje)
      }
    });
  }
  
  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      backdropDismiss: false,
      header: 'Importante',
      subHeader: 'La vida de los perros vale lo mismo que la humana',
      message: 'Al momento de atender el reporte es necesario que sepas que otro usuario no podra ver el reporte, es por ello que te pedimos que seas conciente y no des mal usu de esta funcion',
      buttons: [
        {
          text: 'Atender',
          cssClass: 'alert-button-confirm',
          handler: () => {this.atender(id)}
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
