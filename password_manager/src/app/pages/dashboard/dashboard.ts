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
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {


}