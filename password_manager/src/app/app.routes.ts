import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './pages/forgetPassword/forgetPassword';
import { PageNotFoundComponent } from './pages/notFound/notFound';
import { LoginComponent } from './pages/loginRegister/loginRegister';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NgModule } from '@angular/core';



  
export const routes: Routes = [
    
    
    {path:'' , component:LoginComponent},

    {path:'forgetpassword' , component:ForgetPasswordComponent},

    { path: '**', component: PageNotFoundComponent },

    { path: 'auth/dashboard', 
    component: DashboardComponent,
    //TODO : mettre en place un guard
},
]