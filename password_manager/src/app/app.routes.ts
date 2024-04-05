import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForgetPasswordComponent } from './pages/forgetPassword/forgetPassword';
import { PageNotFoundComponent } from './pages/notFound/notFound';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login';


export const routes: Routes = [
    
    {path:'' , component:LoginComponent},

    {path:'forgetpassword' , component:ForgetPasswordComponent},

    { path: '**', component: PageNotFoundComponent }
];

