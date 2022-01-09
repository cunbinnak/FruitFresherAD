import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  roles:any;

  constructor(private http: HttpClient) { }

  login(formlogin:FormData){
    return this.http.post('http://localhost:8080/api/v1/login',formlogin);
  }

  get isLoggedIn():boolean{
    let authenToken = sessionStorage.getItem('token');
    return (authenToken !==null)? true : false;
  }

  get inforUser():string[]{
    var temp = sessionStorage.getItem('roles');
    this.roles = temp;
    return this.roles;
  }
}
