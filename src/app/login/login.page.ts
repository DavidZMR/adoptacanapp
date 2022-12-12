import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string;
  password: string;

  constructor(
      private router: Router, 
      private menuCtrl: MenuController,
      private authService: AuthService ,
      private alertController: AlertController
    ) { }

  ngOnInit() {
    this.menuCtrl.enable(false)
  }

  login(){
    let data = {
      'strEmail': this.correo,
      'strPassword': this.password
    } 
    this.authService.loginUser(data).subscribe(res => {
      if (res.intResponse === 200) {
        
        var aux: any = res.Result;
        aux = JSON.stringify(aux.user)
        console.log(aux)
        localStorage.setItem('user', aux)
        aux = res.Result
        aux = aux.user.id
        console.log(aux)
        localStorage.setItem('id',aux)
        this.menuCtrl.enable(true)
        this.router.navigateByUrl('/tabs',{replaceUrl: true});
      } else {
        this.presentAlertError();
      }
    });
    
    
  }

  async presentAlertError() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'No se encontro usuario',
      message: 'Verifique sus datos.',
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
