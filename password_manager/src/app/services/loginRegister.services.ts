import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { loginRegister } from "../models/loginRegister.models";
import { environnement } from "../environnement/environnement";
@Injectable({
    providedIn: 'root'
})
export class LoginRegisterService {
    endpointUrl = environnement.baseUri + `/auth/`;

    constructor(private httpClient: HttpClient) { }

    authentification(email: string, password: string): Observable<any> {
        return new Observable(observer => {
            this.httpClient.post(this.endpointUrl, { email, password }).subscribe(
                (result: any) => {
                    const authentif = new loginRegister();
                    authentif.loadFromJson(result);
                    observer.next(authentif);
                    observer.complete();
                },
                error => {
                    observer.error(error);
                }
            );
        });
    }
}
