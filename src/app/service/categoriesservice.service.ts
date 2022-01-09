import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { categories } from 'src/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesserviceService {

  constructor(private http : HttpClient) { }

  getlistCate(){
    return this.http.get('http://http://13.229.71.124:8080/admin/api/v1/categories');
  }

  addnewCate(cate:categories){
    return this.http.post('http://13.229.71.124:8080/admin/api/v1/savecategories', cate);
  }

  updateCate(cateupdate:categories){
    return this.http.put('http://13.229.71.124:8080/admin/api/v1/updatecategories', cateupdate);
  }

  deleteCate(id:number){
    return this.http.delete('http://13.229.71.124:8080/admin/api/v1/categories/'+id);
  }
}
