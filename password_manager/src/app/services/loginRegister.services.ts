import { Injectable, inject, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environnement } from "../environnement/environnement";
import { HttpHeaders } from '@angular/common/http';
import * as rxjs from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { loginRegister } from "../models/loginRegister.models";
@Injectable({
    providedIn: 'root'
})
export class LoginRegisterService {
    constructor(private httpClient: HttpClient) { 
        this.loadLoginDataFromLocalStorage();
    }
    private loginData!: loginRegister;
    
      private loadLoginDataFromLocalStorage(): void {
        const storedData = localStorage.getItem('loginData');
        if (storedData) {
          this.loginData = JSON.parse(storedData);
        }
      }
    authentification(email: string, password: string): Observable<any> {
        const endpointUrl = environnement.baseUri + `/auth/login`;
        const body = { email, password };
        return this.httpClient.post<any>(endpointUrl, body).pipe(
            catchError(this.handleError)
        );
    }

    register(email:string,username:string,password:string){
        const endpointUrl = environnement.baseUri + `/auth/register`;
        const body = { email,username, password };
        return this.httpClient.post<any>(endpointUrl, body).pipe(
            catchError(this.handleError)
        );
        
    }
    private handleError(error: HttpErrorResponse) {
        console.error('DataService: error in getData()', error);
        return throwError('Une erreur s\'est produite; veuillez réessayer plus tard.');
      }
      
      setLoginData(data: loginRegister): void {
        this.loginData = data;
        localStorage.setItem('loginData', JSON.stringify(data));
      }
    
      getLoginData(): loginRegister {
        return this.loginData;
      }
    
      clearLoginData(): void {

        localStorage.removeItem('loginData');
      }
    
      isLoggedIn(): boolean {
        return this.getLoginData() !== null;
      }
}
