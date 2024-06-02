import { Injectable, inject, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { loginRegister } from "../models/loginRegister.models";
import { environnement } from "../environnement/environnement";
import { HttpHeaders } from '@angular/common/http';
import * as rxjs from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class LoginRegisterService {
    constructor(private httpClient: HttpClient) { }
    
    // endpointUrl = environnement.baseUri + `:/auth/me`;
    endpointUrl ="http://127.0.0.1:8080/auth/login";

    authentification(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.httpClient.post<any>(this.endpointUrl, body).pipe(
            catchError(this.handleError)
        );
    }
    private handleError(error: HttpErrorResponse) {
        console.error('DataService: error in getData()', error);
        return throwError('Une erreur s\'est produite; veuillez réessayer plus tard.');
      }
}
