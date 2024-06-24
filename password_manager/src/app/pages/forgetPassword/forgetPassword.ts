import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InputOtpModule } from 'primeng/inputotp';
import { ForgetPasswordServices } from '../../services/forgetPassword.services';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { passwordforget } from '../../models/forgetPassword.models';
import { ToastModule } from 'primeng/toast';
import { otpCode } from '../../models/otpCode.models';
import { DialogModule } from 'primeng/dialog';
import { changePass } from '../../models/changePass.models';
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
    InputOtpModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ToastModule,
    DialogModule
  ],
  providers: [BrowserModule , MessageService , ForgetPasswordComponent],
  templateUrl: './forgetPassword.html',
  styleUrl: './forgetPassword.scss',
})
export class ForgetPasswordComponent {
  isLoading=false;
  urlreset="";
  constructor(
    private router: Router,
    private forgetPasswordService: ForgetPasswordServices,
    private messageService: MessageService
    ) {}

    messageforgetPassword="";
    statusforgetPassword=""
    messages: Message[] = [];
    erreurEmail = false;
    visibleOtp = false;
    passwordChangeVisible=false;
    newPassword="";
    newPassword2="";
    email = '';
    Otpcode="";

  handleResetPassword(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      this.erreurEmail = true;
      this.messages = [
        {
          severity: 'error',
          summary: 'Erreur',
          detail: "L'adresse mail rentrée n'est pas valide !",
        },
      ];
    } else {
      this.passwordforget(email);
      this.isLoading = true;

    }
  }

  passwordforget(email: string) {
    this.forgetPasswordService.resetPassword(email).subscribe({
      next: (response: passwordforget) => {
        console.log('Authentification successful', response);
        console.log(response.status)
        if(response.status== 'success'){
          console.log("test")
          this.visibleOtp = true;
          this.messages = [
            {
              severity: 'success',
              summary: 'Email envoyé',
              detail:
                "Un email de réinitialisation a été envoyé à l'adresse " + email,
            },
          ];
        }
        if(response.status== 'failed'){
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
        }
      
      },
      error: (error) => {
        console.error('Authentification error', error);
        this.isLoading = false;
        this.messages = [
          {
            severity: 'error',
            summary: 'Erreur',
            detail: "L'adresse mail rentrée n'est pas valide !",
          },
        ];
      },
    });
  }

  changePassword(email:string , Otpcode:string){
    console.log(email+''+Otpcode)
    this.forgetPasswordService.verifOtpCode(email ,Otpcode).subscribe({
    next: (response: otpCode) => {
      this.urlreset=response.urlreset;
      if(response.status== 'success'){
        console.log("test")
        this.passwordChangeVisible = true;
  
      }
      if(response.status== 'failed'){
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Code OTP Incorrect', detail: 'Code Otp incorrect' });
      }
    
    },
    error: (error) => {
      console.error('Authentification error', error);
      this.isLoading = false;
      this.messages = [
        {
          severity: 'error',
          summary: 'Erreur',
          detail: "L'adresse mail rentrée n'est pas valide !",
        },
      ];
    },
  });
  }

  resendOtpCode(){
    this.passwordforget(this.email)
    this.messageService.add({ severity: 'success', summary: 'Code OTP', detail: 'Un nouveau code vous à été envoyé' });

  }

  ValidNewPassword(newPassword:string,newPassword2:string){
      if(newPassword != newPassword2 || newPassword == "" || newPassword2==""){
        this.messageService.add({ severity: 'error', summary: 'Changement de mot de passe', detail: 'mot de passe différent' });
      }
      else{
          this.forgetPasswordService.changePassword(newPassword, newPassword2,this.urlreset).subscribe({
            next: (response: changePass) => {
              if(response.status== 'success'){
                this.messageService.add({ severity: 'success', summary: 'Code OTP', detail: 'Nouveau mot de passe enregistré vous allez être redirigé ' });
                setTimeout(() => {
                  this.router.navigate(['/']);
                }, 5000)
          
              }
              if(response.status== 'failed'){
                this.isLoading = false;
                this.messageService.add({ severity: 'error', summary: 'changement de mot de passe échoué', detail: 'le changement de mot de passe à échoué' });
              }
            
            },
            error: (error) => {
              console.error('Authentification error', error);
              this.isLoading = false;
              this.messages = [
                {
                  severity: 'error',
                  summary: 'Erreur',
                  detail: "Erreur lors du changement de mot de passe",
                },
              ];
            },
          });
      }
  }
}
