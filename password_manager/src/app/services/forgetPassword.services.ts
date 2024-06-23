import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environnement } from '../environnement/environnement';
import { HttpHeaders } from '@angular/common/http';
import * as rxjs from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordServices {
  constructor(private httpClient: HttpClient) {}


  resetPassword(email: string) {
    const endpointUrl = environnement.baseUri + `/auth/reset_password`;
        const body = { email };
        return this.httpClient.post<any>(endpointUrl, body).pipe(
            catchError(this.handleError)
        );
  }

  verifOtpCode(email:string ,OtpCode: string) {
    const endpointUrl = environnement.baseUri + `/auth/verify_otp`;
        const body = { email , OtpCode };
        return this.httpClient.post<any>(endpointUrl, body).pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('DataService: error in getData()', error);
    return throwError(
      "Une erreur s'est produite; veuillez réessayer plus tard."
    );
  }
}
