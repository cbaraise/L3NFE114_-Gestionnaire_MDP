
export class loginRegister{
    statuts='';
    message='';
    acces_token="";
    refresh_token="";

    loadFromJson(jsonElement:any){
        Object.assign(this,jsonElement)
    }
}