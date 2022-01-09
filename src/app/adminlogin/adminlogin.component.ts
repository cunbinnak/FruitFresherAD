import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inforUserLoginResponse } from 'src/inforUserLoginResponse';
import { login } from 'src/login';
import { LoginserviceService } from '../service/loginservice.service';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private loginservice: LoginserviceService,private _router:Router, 
    private userservice:UserserviceService, 
  ) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
   if(this.token!==null){
     this._router.navigate(['/admin/home'])
   }
   
  }


  user: login = new login();
  token:any;

  islogin = false;
  data:any;
  role:any;
  msg:string ="";
  cart:any = sessionStorage.getItem('cart');

  userLoginResponse:inforUserLoginResponse = new inforUserLoginResponse();
  login(){
    let dataform:FormData = new FormData();


    dataform.append("username",this.user.username);
    dataform.append("password", this.user.password);
    this.loginservice.login(dataform).subscribe(res =>{
       
      this.data = res;
          if(this.data && this.data.roles){
    
          }
          this.token = this.data.accessToken;
          this.islogin = true;
         
          this.userLoginResponse.accesstoken = this.data.accessToken;
          this.userLoginResponse.refreshtoken = this.data.refreshToken;
          this.userLoginResponse.roles = this.data.roles;
          this.userLoginResponse.username = this.data.username;
    
          sessionStorage.setItem('inforUserLogin', JSON.stringify(this.userLoginResponse));
          var x = this.data.roles;
          sessionStorage.setItem('token',this.token);
          sessionStorage.setItem('roles',x);
          sessionStorage.setItem('username',this.data.username);
          //cần chỉnh sửa lại sang trang home rồi thêm linh sang admin/home
          this._router.navigate(['/admin/home']);
    },(error:HttpErrorResponse)=> {
        this.msg = "Không đúng mật khẩu hoặc tài khoản này đã bị khóa, vui lòng liên hệ Admin";
    })
  }

}
