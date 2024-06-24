import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './pages/forgetPassword/forgetPassword';
import { PageNotFoundComponent } from './pages/notFound/notFound';
import { LoginComponent } from './pages/loginRegister/loginRegister';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';



  
export const routes: Routes = [
    
    
    {path:'' , component:LoginComponent},

    {path:'forgetpassword' , component:ForgetPasswordComponent},

    { path: '**', component: PageNotFoundComponent },

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

]