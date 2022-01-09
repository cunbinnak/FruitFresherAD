import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categories } from 'src/categories';
import { CategoriesserviceService } from '../service/categoriesservice.service';

@Component({
  selector: 'app-admincate',
  templateUrl: './admincate.component.html',
  styleUrls: ['./admincate.component.css']
})
export class AdmincateComponent implements OnInit {

  constructor(private cateservice:CategoriesserviceService, private _router:Router) { }

  ngOnInit(): void {

    this.getlistCate();
    
  }

  getInforFromSession:any = JSON.parse(sessionStorage.getItem('inforUserLogin')||"");
 

  username:any = this.getInforFromSession.username;
  roles:any = this.getInforFromSession.roles;


  signout(){
    sessionStorage.clear();
    this._router.navigate(['/admin/login']);
  }

  

  listCate:any=[];
  getlistCate(){
    return this.cateservice.getlistCate().subscribe(res =>{
      this.listCate= res;
    })
  }
  
  newCate:categories = new categories();

  addnewCate(){
    return this.cateservice.addnewCate(this.newCate).subscribe(res =>{
      this.getlistCate();
      this.newCate = new categories();
    })
  }

  editCate:categories = new categories();

  initeditCate(cate:categories){
      this.editCate = cate;
  }

  updateCate(){
    return this.cateservice.updateCate(this.editCate).subscribe(res => {
      this.getlistCate();
      this.editCate = new categories();
    })
    
  }

  deleteCate(cateid:number){
    return this.cateservice.deleteCate(cateid).subscribe(res => {
      this.getlistCate();
    })
  }

  searchItem(key:string){
    let result:categories []=[];
    for(let c of this.listCate){
      if(c.cate_name.toLowerCase().indexOf(key.toLocaleLowerCase())!==-1
        //  || c.cate_status.toLowerCase().indexOf(key.toLocaleLowerCase())!==-1
        // || p.price.toLowerCase().indexOf(key.toLocaleLowerCase())!==-1)
      ){
          result.push(c);
        }
    }
    this.listCate= result;
    if(result.length===0 || !key){
      this.getlistCate();
    }
  }

}
