import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule ,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

errorMassage:string = ''

  loginForm :FormGroup = new FormGroup ({
    email : new FormControl(null,[RxwebValidators.required(),RxwebValidators.email()]),
    password : new FormControl(null,[RxwebValidators.password({validation:{maxLength: 20,minLength: 5,digit: true,specialCharacter: true} }), RxwebValidators.required()]),

  })

constructor(private _authService:AuthService, private _router:Router){}


  submitForm(form: FormGroup) {
    this._authService.login(form.value).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('userToken', data.token);
        this._authService.userToken.next(data.token);
        this._authService.setUserToken();
      this._router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        this.errorMassage = error.error.msg
      }
    )
  }

}
