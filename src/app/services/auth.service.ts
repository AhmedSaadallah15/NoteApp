import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Userdata } from '../interfaces/userdata';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  constructor( private _httpClient:HttpClient, private _router:Router) {
    if(localStorage.getItem('userToken') ){
      this.userToken.next(localStorage.getItem('userToken'));
    }
  }


setUserToken(){
  this.userToken.next(localStorage.getItem('userToken'));
}

  register(data: Userdata):Observable <any> {
    return this._httpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', data);
  }



  login(data: Userdata):Observable <any> {
    return this._httpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', data);
  }


logOut(){
  localStorage.removeItem('userToken');
  this.userToken.next(null);
  this._router.navigate(['/login']);
}




}
