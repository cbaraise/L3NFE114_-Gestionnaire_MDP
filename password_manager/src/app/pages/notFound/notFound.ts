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
    RouterModule
  ],
  
  providers: [BrowserModule],
  templateUrl: './notFound.html',
  styleUrl: './notFound.scss',
})
export class PageNotFoundComponent {

    
}