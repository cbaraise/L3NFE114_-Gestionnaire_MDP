import { Component, NgModule, OnInit } from '@angular/core';
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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { LoginRegisterService } from '../../services/loginRegister.services';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/authentification.services';
import { loginRegister } from '../../models/loginRegister.models';
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
    MessagesModule,
    ToastModule,
  ],

  providers: [BrowserModule, LoginRegisterService, MessageService],
  templateUrl: './loginRegister.html',
  styleUrl: './loginRegister.scss',
})
export class LoginComponent {
  constructor(
    private loginRegisterService: LoginRegisterService,
    private authService:AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  data: any[] = [];
  errorMessage: string = '';
  title = 'Vault Shield';
  messages: Message[] = [];
  messagesErreurRegister: Message[] = [];
  erreurLogin = false;
  erreurRegister = false;

  stateOptions: any[] = [
    { label: 'Connexion', value: 'login' },
    { label: 'Inscription', value: 'register' },
  ];
  email = '';
  passwordValue = '';
  passwordValue2 = '';
  username = '';
  selectedOption: string = 'login';

  handleAuthentification(identifiant: string, password: string) {
    this.erreurLogin = false;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(identifiant);

    if (!isValidEmail || identifiant == '') {
      this.erreurLogin = true;
      this.messages = [
        {
          severity: 'error',
          summary: 'Erreur Email',
          detail: "Le login rentrée n'est pas valide !",
        },
      ];
    }
    if (password === '' || password === null) {
      this.erreurLogin = true;
      this.messages = [
        {
          severity: 'error',
          summary: 'Erreur ',
          detail: 'Le mot de passe rentrée est vide !',
        },
      ];
    }
    if (!this.erreurLogin) {
      this.loginConnexion(identifiant, password);
    }
  }
  loginConnexion(identifiant: string, password: string) {
    this.loginRegisterService
      .authentification(identifiant, password)
      .subscribe({
        next: (response: loginRegister) => {
          if (response.status != 'failed') {
            console.log('Authentification successful', response);
            this.loginRegisterService.setLoginData(response)
            this.router.navigate(['/dashboard']);
                        
            } else {
            this.erreurLogin = true;
            this.messages = [
              {
                severity: 'error',
                summary: 'Erreur Authentification',
                detail:
                  "Le mot de passe ou l'adresse mail rentrée est incorrect.",
              },
            ];
          }
        },
        error: (error) => {
          console.error('Authentification error', error);
          this.erreurLogin = true;
          this.messages = [
            {
              severity: 'error',
              summary: 'Erreur Authentification',
              detail: 'La tentative de connexion a échoué.',
            },
          ];
        },
      });
  }

  handleRegister(
    email: string,
    usernames: string,
    passwordValue: string,
    passwordValue2: string
  ) {
    console.log('on passe ici');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    this.erreurRegister = false;

    if (!isValidEmail || email == '') {
      this.erreurRegister = true;
      this.messagesErreurRegister = [
        {
          severity: 'error',
          summary: 'Erreur Email',
          detail: "L'adresse mail rentrée n'est pas valide !",
        },
      ];
    }
    if (
      passwordValue != passwordValue2 ||
      passwordValue == '' ||
      passwordValue2 == ''
    ) {
      this.erreurRegister = true;
      this.messagesErreurRegister = [
        {
          severity: 'error',
          summary: 'Erreur mot de passe',
          detail: 'Les mots de passe saisies ne sont pas les mêmes !',
        },
      ];
    }
    if (passwordValue.length < 12 || passwordValue2.length < 12) {
      this.erreurRegister = true;
      this.messagesErreurRegister = [
        {
          severity: 'error',
          summary: 'Erreur mot de passe',
          detail:
            'Les mots de passe saisies ont une taille inférieur à 12 caractères !',
        },
      ];
    }

    if (usernames == null || usernames == '') {
      this.erreurRegister = true;
      this.messagesErreurRegister = [
        {
          severity: 'error',
          summary: "Erreur nom d'utilisateur",
          detail: "Le nom d'utilisateur est vide !",
        },
      ];
    }
    if (!this.erreurRegister) {
      this.registerConnexion(email, usernames, passwordValue);
    }
  }
  registerConnexion(email: string, usernames: string, passwordValue: string) {
    this.loginRegisterService
      .register(email, usernames, passwordValue)
      .subscribe({
        next: (response: any) => {
          console.log('Register successful', response);
          this.username = '';
          this.email = '';
          this.passwordValue = '';
          this.passwordValue2 = '';
          this.selectedOption = 'login';
          this.messageService.add({
            severity: 'success',
            summary: 'Inscription',
            detail: 'Inscription réussi !',
          });
        },
        error: (error) => {
          console.error('Authentification error', error);
          this.erreurRegister = true;
          this.messagesErreurRegister = [
            {
              severity: 'error',
              summary: "Erreur d'Enregistrement",
              detail: "La tentative d'Enregistrement a échoué.",
            },
          ];
        },
      });
  }
}
