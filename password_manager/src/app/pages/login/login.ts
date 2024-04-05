import { Component, NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    InputTextModule,
    PasswordModule,
    DividerModule,
    CommonModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    RouterModule,
    RouterLink,
    RouterModule
  ],
  
  providers: [BrowserModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  title = 'Vault Shield';

  idValue="" ;
  passwordValue="" ;
  constructor(
    private router: Router

  ){
  }

  handleAuthentification(identifiant:string,password:string) {

    console.log(identifiant+""+password);

  }

  handleForgetPassword(){
    this.router.navigate(['/forgetpassword'])
  }
    
}
