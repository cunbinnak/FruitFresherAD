import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(private http:HttpClient) { }

  getlistProduct(params:any):Observable<any> {
    return this.http.get<any>('http://13.229.71.124:8080/admin/api/v1/products',{params});
  }

  savenewProduct(pro:FormData){
    return this.http.post('http://13.229.71.124:8080/admin/api/v1/saveproduct',pro);
  }

  updateProduct(editpro:FormData){
    return this.http.put('http://13.229.71.124:8080/admin/api/v1/updateproduct',editpro);
  }

  deletepro(productid:number){
    return this.http.delete('http://13.229.71.124:8080/admin/api/v1/product/'+productid);
  }
}
