import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/product';
import { CategoriesserviceService } from '../service/categoriesservice.service';
import { ProductserviceService } from '../service/productservice.service';

@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.css']
})
export class AdminproductComponent implements OnInit {

  constructor(private productservice:ProductserviceService, private cateservice:CategoriesserviceService, private _router:Router ) { }

  ngOnInit(): void {


      this.getlistProduct();
      this.getlistCate();
  
    
  }

  getInforFromSession:any = JSON.parse(sessionStorage.getItem('inforUserLogin')||"");
 

  username:any = this.getInforFromSession.username;
  roles:any = this.getInforFromSession.roles;

  signout(){
    sessionStorage.clear();
    this._router.navigate(['/admin/login']);
  }


  


  listProduct:any=[];
  page=1;
  count=0;
  pagesize=10;

  
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
  getlistProduct():void{
    let params = this.getParams(this.page, this.pagesize);
    
    this.productservice.getlistProduct(params).subscribe(res =>{

     const {listProducts,totalItem} = res;
      
        this.listProduct = listProducts;
        this.count = totalItem;
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getlistProduct();
    this.getlistCate();
  }

  newpro:product = new product();
  listCate:any=[];
  getlistCate(){
    this.cateservice.getlistCate().subscribe(res => {
      this.listCate = res;
    })
  }
  //handle file
  fileToUpload!: File | null;
  selectFile(event: any): void {
    this.fileToUpload = event.target.files.item(0);
  }
  addnewPro(){
    let data : FormData = new FormData();
console.log(this.newpro);
    if(this.fileToUpload != undefined){
      data.append('file', this.fileToUpload);
    }
    data.append('productname', this.newpro.productname);
    data.append('cateid', this.newpro.categories);
    data.append('price', this.newpro.price);
    data.append('description', this.newpro.description);
    data.append('status', this.newpro.productStatus.toString());
    this.productservice.savenewProduct(data).subscribe(res =>{
      this.getlistProduct();
    })
  }

  editpro:product = new product();
  initeditpro(product:product){
    this.editpro= product;
  }


  editUrlImg:any;
  editPro(){
    let data:FormData = new FormData();
    let url:any;

    if(this.fileToUpload!=null){
      url = this.fileToUpload;
      data.append('editfile', url);
      
    }else{
      this.editUrlImg = this.fileToUpload;
      data.append('editfile', this.editUrlImg);
    }
    data.append('productname', this.editpro.productname);
    data.append('price', this.editpro.price.toString());
    data.append('description', this.editpro.description);
    data.append('status', this.editpro.productStatus.toString());
    data.append('id', this.editpro.productid.toString());

    this.productservice.updateProduct(data).subscribe(res => {
      this.getlistProduct();
    })
  }

  deleteproduct(productid:number){
    this.productservice.deletepro(productid).subscribe(res => {
      this.getlistProduct();
    })
  }

  searchproduct(key:string){
    let result:product[]=[];
    for(let p of this.listProduct){
      if(p.productname.toLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      || p.description.toLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      || p.productStatus.toString().toLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      || p.createDate.toString().toLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      || p.productid.toString().toLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      || p.creator.toLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      ){
        result.push(p)
      }
    }
    this.listProduct = result;
    if(result.length==0 || !key){
      this.getlistProduct();
    }

  }

}
