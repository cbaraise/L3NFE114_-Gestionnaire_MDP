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
import { SelectButtonModule } from 'primeng/selectbutton';
import { HttpClientModule } from '@angular/common/http';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

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
    RouterModule,
    SelectButtonModule,
    HttpClientModule,
    MessagesModule
  ],
  
  providers: [BrowserModule],
  templateUrl: './loginRegister.html',
  styleUrl: './loginRegister.scss',
})
export class LoginComponent {
  constructor()
  {}
  title = 'Vault Shield';
  messages: Message[]=[] ;
  erreurLogin=false;

  stateOptions: any[] = [{ label: 'Connexion', value: 'login' },{ label: 'Inscription', value: 'register' }];
  email="" ;
  passwordValue="" ;
  passwordValue2="" ;
  username=""
  selectedOption: string = 'login';


  handleAuthentification(identifiant:string,password:string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(identifiant);

    if( !isValidEmail){
      this.erreurLogin =true;
      this.messages=[{ severity: 'error', summary: 'Erreur Email', detail: "L'adresse mail rentrée n'est pas valide !" }]
    }
    if(password === "" || password === null)
      {
        this.erreurLogin=true;
        this.messages=[{ severity: 'error', summary: 'Erreur ', detail: "Le mot de passe rentrée est vide !" }];
      }
    

  }

  handleRegister(email:string,usernames:string,passwordValue:string,passwordValue2:string){
    

  }

    
}
