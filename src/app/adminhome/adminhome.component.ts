import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private _router:Router ) { 
    
  }

  ngOnInit(): void {
    
    
  }

  getInforFromSession:any = JSON.parse(sessionStorage.getItem('inforUserLogin')||"");
 

  username:any = this.getInforFromSession.username;
  roles:any = this.getInforFromSession.roles;



  signout(){
    sessionStorage.clear();
    this._router.navigate(['/admin/login']);
  }

}
