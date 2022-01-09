import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }

  getuserbyname(username:string){
    return  this.http.get('http://13.229.71.124:8080/admin/api/v1/user/'+username)
  }

  getlistrole(){
    return this.http.get('http://13.229.71.124:8080/admin/api/v1/user/listroles');
  }


  register(newuser:user){
    return this.http.post('http://13.229.71.124:8080/admin/api/v1/saveuser',newuser);
  }

  getlistUser(params:any):Observable<any>{
    return this.http.get('http://13.229.71.124:8080/admin/api/v1/users',params);
  }


  updateUser(edituser:FormData){
    return this.http.put('http://13.229.71.124:8080/admin/api/v1/user/edit',edituser);
  }

  deleteuser(id:number){
    return this.http.delete('http://13.229.71.124:8080/admin/api/v1/deleteuser/'+id);
  }


  getlinkresetpass(infor:FormData){
    return this.http.post('http://13.229.71.124:8080/admin/api/v1/user/resetpassword',infor);
  }

  changepassword(userChangepass:user){
    return this.http.post('http://localhost:8080/admin/api/v1/user/changepassword',userChangepass);
  }
}
