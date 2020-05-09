import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  //host: String = 'http://catalogue-service';
  host: string="http://localhost:8081";

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getProducts(page: Number, size: Number) {
    return this.http.get(this.host + '/produits?page=' + page + '&size=' + size);
  }

  searchProductsByKeyword(value, page: Number, size: Number) {
    return this.http.get(this.host + '/produits/search/byDesignationPage?mc=' + value + '&page=' + page + '&size=' + size);
  }

  getProduct(url): Observable<Product> {
    return this.http.get<Product>(url);
  }

  addProduct(data): Observable<Product> {
    return this.http.post<Product>(this.host + '/produits', data);
  }

  editProduct(url, data): Observable<Product> {
    return this.http.put<Product>(url, data);
  }

  deleteProduct(url) {
    return this.http.delete(url);
  }


  getProductsbyCategorie(url) {
    return this.http.get(url);
  }

  getCategory(url) {
    return this.http.get(url);
  }

  getCategories() {
    return this.http.get(this.host + '/categories');
  }

  deleteCategory(url) {
    let header = new HttpHeaders({'authorization': 'Bearer ' + this.authService.token});
    return this.http.delete(url, {headers: header});
  }

  addCategory(url, data) {
    let header = new HttpHeaders({'authorization': 'Bearer ' + this.authService.token});
    return this.http.post(url, data, {headers: header});
  }

  editCategory(url, value) {
    let header = new HttpHeaders({'authorization': 'Bearer ' + this.authService.token});
    return this.http.patch(url, value, {headers: header});
  }
}
