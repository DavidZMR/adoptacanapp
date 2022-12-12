import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
) {
  defineCustomElements(window);
}
  
  close(){
    sessionStorage.clear()
    localStorage.clear()
    this.menuCtrl.enable(false)
    this.router.navigate([''])
  }
}
