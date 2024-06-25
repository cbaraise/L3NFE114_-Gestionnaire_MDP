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
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  disconnect(acces_token: string) {
    const endpointUrl = environnement.baseUri + `/auth/logout`;
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .post<any>(endpointUrl, null, { headers: header })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.error('DataService: error in getData()', error);
    return throwError(
      "Une erreur s'est produite; veuillez réessayer plus tard."
    );
  }

  ShowAllVault(acces_token: string) {
    const endpointUrl = environnement.baseUri + `/vault/getall`;
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .get<any>(endpointUrl, { headers: header })
      .pipe(catchError(this.handleError));
  }

  SecretKey(uuidCoffre: string, acces_token: string) {
    const endpointUrl = environnement.baseUri + `/vault/secretkey`;
    const body = { uuidCoffre };
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .post<any>(endpointUrl, body, { headers: header })
      .pipe(catchError(this.handleError));
  }
  getInfoCoffre(uuidCoffre: string, secretkey: string, acces_token: string) {
    const endpointUrl = environnement.baseUri + `/vault/get`;
    const body = { uuidCoffre, secretkey };
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .post<any>(endpointUrl, body, { headers: header })
      .pipe(catchError(this.handleError));
  }

  getCategorie(acces_token: string) {
    const endpointUrl = environnement.baseUri + `/category/get`;
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .get<any>(endpointUrl, { headers: header })
      .pipe(catchError(this.handleError));
  }

  addNewCategorie(acces_token: string, nomCategorie: string) {
    console.log('on passe ici ');
    const endpointUrl = environnement.baseUri + `/category/add`;
    const body = { nomCategorie };
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .post<any>(endpointUrl, body, { headers: header })
      .pipe(catchError(this.handleError));
  }

  modifVault(
    uuidCoffre: string,
    secretkey: string,
    acces_token: string,
    email: string,
    note: string,
    password: string,
    sitename: string,
    urllogo: string,
    urlsite: string,
    username: string
  ) {

    const endpointUrl = environnement.baseUri + `/vault/update`;
    const body = { uuidCoffre, secretkey, email , note  , password , sitename , urllogo , urlsite , username };
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .put<any>(endpointUrl, body, { headers: header })
      .pipe(catchError(this.handleError));
  }


  addVault(acces_token:string ,urllogo:string ,sitename:string,urlsite:string,email:string,username:string,password:string,note:string , uuidcategorie:string){
    const endpointUrl = environnement.baseUri + `/vault/add`;
    const body = { email , note  , password , sitename , urllogo , urlsite , username };
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .post<any>(endpointUrl, body, { headers: header })
      .pipe(catchError(this.handleError));
  }

  deleteVault(uuidCoffre:string,acces_token:string){
    const endpointUrl = environnement.baseUri + `/vault/delete`;
    const body = {uuidCoffre};
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .post<any>(endpointUrl, body, { headers: header })
      .pipe(catchError(this.handleError));
  }

  showGroupVault(acces_token:string){
    const endpointUrl = environnement.baseUri + `/group/list`;
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .get<any>(endpointUrl, { headers: header })
      .pipe(catchError(this.handleError));
  
    }

    createGroup(nomGroup:string , acces_token:string){
      const endpointUrl = environnement.baseUri + `/group/add`;
    const body = {nomGroup};
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .post<any>(endpointUrl, body, { headers: header })
      .pipe(catchError(this.handleError));
    }


    adminList(acces_token:string){
      const endpointUrl = environnement.baseUri + `/admin/listadmin`;
    const header = new HttpHeaders({
      Authorization: `Bearer ${acces_token}`,
    });
    return this.httpClient
      .get<any>(endpointUrl, { headers: header })
      .pipe(catchError(this.handleError));
  
    }

    NewAdmin(email:string,acces_token:string){
      const endpointUrl = environnement.baseUri + `/admin/setadmin`;
      const body = { email};
      const header = new HttpHeaders({
        Authorization: `Bearer ${acces_token}`,
      });
      return this.httpClient
        .put<any>(endpointUrl, body, { headers: header })
        .pipe(catchError(this.handleError));
    }

    showAllPasswords(acces_token:string){
      const endpointUrl = environnement.baseUri + `/admin/listvault`;
      const header = new HttpHeaders({
        Authorization: `Bearer ${acces_token}`,
      });
      return this.httpClient
        .get<any>(endpointUrl, { headers: header })
        .pipe(catchError(this.handleError));
    
    }


    shareGroupValut(acces_token:string,emailusershare:string,uuidGroup:string, isExpired:number){
      
        const endpointUrl = environnement.baseUri + `/group/share`;
        const body = {emailusershare , uuidGroup , isExpired};
        const header = new HttpHeaders({
          Authorization: `Bearer ${acces_token}`,
        });
        return this.httpClient
          .post<any>(endpointUrl, body, { headers: header })
          .pipe(catchError(this.handleError));
      }

}
