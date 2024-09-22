import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
     ButtonModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
   isLoggedIn:boolean = false;


constructor(private _AuthService:AuthService){

  _AuthService.userToken.getValue()
  _AuthService.userToken.subscribe({
    next:(data)=>{
      console.log(data);
      this.isLoggedIn = data? true : false;

    }
  })
}

logOut(){
  this._AuthService.logOut();

}







}
