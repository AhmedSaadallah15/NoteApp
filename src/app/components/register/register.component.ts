import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

errorMassage:string = ''


  registerForm :FormGroup = new FormGroup ({
    name : new FormControl(null,[RxwebValidators.required(),RxwebValidators.maxLength({value:15 }),RxwebValidators.minLength({value:3 })]),
    email : new FormControl(null,[RxwebValidators.required(),RxwebValidators.email()]),
    password : new FormControl(null, [RxwebValidators.password({validation:{maxLength: 20,minLength: 5,digit: true,specialCharacter: true} }), RxwebValidators.required()]),
    age : new FormControl(null,[RxwebValidators.minNumber({value:10 }),RxwebValidators.maxNumber({value:65 }),RxwebValidators.required()]),
    phone : new FormControl(null,([RxwebValidators.required(), RxwebValidators.pattern({ expression: { egyptianPhone: /^(01[0125])[0-9]{8}$/ } })]))
  })

constructor(private _authService:AuthService ,private _router:Router){}


  submitForm(form: FormGroup) {
    console.log(form);
    this._authService.register(form.value).subscribe(
      (data) => {
        console.log(data);
      this._router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        this.errorMassage = error.error.msg
      }
    );
  }
}
