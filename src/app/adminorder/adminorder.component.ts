import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { order } from 'src/order';
import { OrderserviceService } from '../service/orderservice.service';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.css']
})
export class AdminorderComponent implements OnInit {

  constructor(private orderservice:OrderserviceService, private _router: Router) { }



  ngOnInit(): void {

  this.getlistOrder();
    
  }

  getInforFromSession:any = JSON.parse(sessionStorage.getItem('inforUserLogin')||"");
 

  username:any = this.getInforFromSession.username;
  roles:any = this.getInforFromSession.roles;

  signout(){
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  

  listOrder:any=[];

  getlistOrder(){
    this.orderservice.getlistOrder().subscribe(res =>{
      this.listOrder = res;
    })
  }

  editOrder:order = new order();
  initeditOrder(editOrder:order){
    this.editOrder = editOrder;
  }

  newStatus:any;

  listStatus=[
    {option:"Đang Xét Duyệt"},
    {option:"Đang Giao Hàng"},
    {option:"Hủy Đơn Hàng"},
    {option:"Đã Giao Hàng"}
  ];

  edit(){
    this.editOrder.orderStatus= this.newStatus;
    this.orderservice.updateOrder(this.editOrder).subscribe( res => {
      this.getlistOrder();
      this.editOrder = new order();
      this.newStatus="";
    })
  }

  deleteorder(orderId:number){
    this.orderservice.deleteOrder(orderId).subscribe( res => {
      this.getlistOrder();
    })
  }


  searchOrder(key:string){
    let result:any []=[];

    for(let o of this.listOrder){
      if(o.orderid.toString().toLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      ||o.firstname.toLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      ||o.orderStatus.toLowerCase().indexOf(key.toLocaleLowerCase())!=-1){
        result.push(o);
      }
    }
    this.listOrder = result;
    if(result.length==0 || !key){
      this.getlistOrder();
    }
  }

}
