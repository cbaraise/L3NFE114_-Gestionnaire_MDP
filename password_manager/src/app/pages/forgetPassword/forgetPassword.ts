import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';



@Component({
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
    MessagesModule
  ],
  
  providers: [BrowserModule],
  templateUrl: './forgetPassword.html',
  styleUrl: './forgetPassword.scss',
})
export class ForgetPasswordComponent {
 

  messages: Message[]=[] ;
 

  email="" ;
  erreurEmail=false;


  handleResetPassword() {
    if(this.email == "" || this.email== null){
      this.erreurEmail =true;
     this.messages=[{ severity: 'error', summary: 'Erreur', detail: "L'adresse mail rentrée n'est pas valide !" }]
    }

   
  }
    
}
