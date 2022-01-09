import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/user';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {

  constructor(private userservice:UserserviceService,private _router :Router) { }

  ngOnInit(): void {
  this.getlistUser();

  }
  getInforFromSession:any = JSON.parse(sessionStorage.getItem('inforUserLogin')||"");
 

  username:any = this.getInforFromSession.username;
  roles:any = this.getInforFromSession.roles;

  signout(){
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  

  listUser:any=[];
  page=1;
  count=0;
  pagesize=10;
 

  getlistUser(){

    let params = this.getParams(this.page, this.pagesize)

    this.userservice.getlistUser(params).subscribe(res => {

      const {listUsers,totalItem} = res;
      this.listUser = listUsers;
      this.count = totalItem;
    })
  }
  //lấy params truyền vào server
  getParams(page:number, pagesize:number):any{
    let params:any=[];
    if(page){
      params[`page`] = page-1;
    }
    if(pagesize){
      params[`pagesize`] = pagesize;
    }
    return params;
}

  handlePageChange(event: number): void {
    this.page = event;
    this.getlistUser();
    
  }


  edituser:user = new user();
  getuserbyname:any;
  role:any;
  listRole:any;
  newrole:any;

  initeditUser(username:string){
      this.userservice.getuserbyname(username).subscribe(res => {
        this.getuserbyname = res;

        this.edituser = this.getuserbyname;
      
        this.role = this.edituser.listRoles.map((x :any) =>{

          return x.rolename;
        })
        this.getlistrole();
      })

  }


  //get listrole 

  getlistrole(){
    this.userservice.getlistrole().subscribe(res => {
        this.listRole = res;
    })
  }

checkresponse:any;

editUser(){
  let data:FormData = new FormData();
  data.append('rolename', this.newrole);
  data.append('id',this.edituser.id.toString());
  data.append('status', this.edituser.userstatus.toString());
  
  this.userservice.updateUser(data).subscribe( res => {
    this.checkresponse = res;
    console.log(res);
    if(this.checkresponse = "false"){
      alert('Người dùng này đã có quyền này!');
    }else if(this.checkresponse =="OK"){
      alert('Update thành công');
      this.getlistUser();
    }
    
  })
}

//delete user

deleteuser(id:number){
  this.userservice.deleteuser(id).subscribe(res => {
    this.getlistUser();
  })
}


//search user

searchuser(key:string){

  let result:user[]=[];

  for(let u of this.listUser){
    if(u.username.toLowerCase().indexOf(key.toLocaleLowerCase())!=-1   
    || u.fullname.toLowerCase().indexOf(key.toLocaleLowerCase())!=-1){
      result.push(u);
      console.log(u);
    }
  }
  this.listUser = result;
  if(result.length ==0 || !key){
    this.getlistUser();
  }
}

}
