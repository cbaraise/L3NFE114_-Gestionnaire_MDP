import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuItem, Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputOtpModule } from 'primeng/inputotp';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    InputTextModule,
    PasswordModule,
    CommonModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    RouterLink,
    MessagesModule,
    InputOtpModule
  ],
  providers:[],
  templateUrl: './forgetPassword.html',
  styleUrl: './forgetPassword.scss',
})
export class ForgetPasswordComponent {
  constructor(
    private router: Router
  ){
  }
  minutes: number = 1;
  seconds: number = 0;
  timer$?: Observable<number>;
  timerSubscription: Subscription= new Subscription;


  messages: Message[]=[] ;
  visibleOtp=false;
  email="" ;
  erreurEmail=false;
  
  
  handleResetPassword(email:string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    if( !isValidEmail){
      this.erreurEmail =true;
      this.messages=[{ severity: 'error', summary: 'Erreur', detail: "L'adresse mail rentrée n'est pas valide !" }]
    }
    else{
      this.visibleOtp=true;
      this.messages=[{ severity: 'success', summary: 'Email envoyé', detail: "Un email de réinitialisation a été envoyé à l'adresse "+email }]
      this.startTimer();
    }
  }

  startTimer(): void {
    this.timer$ = timer(0, 1000);
    this.timerSubscription = this.timer$.subscribe(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.timerSubscription.unsubscribe();
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    });
  }
    
}
