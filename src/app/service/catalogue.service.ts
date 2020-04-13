import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  host: String="http://localhost:8080";
  constructor(private http: HttpClient) { }

  getProducts(page:Number, size:Number){
    return this.http.get(this.host+ "/produits?page="+page+"&size="+size);
  }

  searchProductsByKeyword(value,page:Number, size:Number){
    return this.http.get(this.host+ "/produits/search/byDesignationPage?mc="+value+"&page="+page+"&size="+size);
  }

  getProduct(url):Observable<Product> {
    return this.http.get<Product>(url);
  }

  addProduct(data):Observable<Product>{
    return this.http.post<Product>(this.host+ "/produits", data);
  }

  editProduct(url,data):Observable<Product>{
    return this.http.put<Product>(url, data);
  }

  deleteProduct(url){
    return this.http.delete(url);
  }
}
