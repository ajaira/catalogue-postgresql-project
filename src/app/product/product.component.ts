import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../service/catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {toBase64String} from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productsItems: any;
  size:Number=5;
  currentPage:Number=0;
  totalPages:Number;
  pages:Array<number>;
  currentKeyword:String;
  constructor(private catalogue: CatalogueService, private router:Router, private activateRoute:ActivatedRoute) {

    router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        let url = atob(this.activateRoute.snapshot.params.productUrl);
        this.onGetProductsByCategorieUrl(url);
      }
    })

  }

  ngOnInit(): void {
  }

  onGetProductsByCategorieUrl(url) {
    this.catalogue.getProductsbyCategorie(url)
      .subscribe(data => {
        this.productsItems = data;
      }, error =>{
        console.log(error);
      })

  }
  onGetProducts() {
    this.catalogue.getProducts(this.currentPage, this.size)
      .subscribe(data=> {
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages.valueOf());
        this.productsItems = data;
        }, error => {
        console.log(error);
      })
  }

  onProductPage(i: number) {
    this.currentPage=i;
    //this.onGetProducts();
    this.searchProducts();
  }

  onSearch(form: any) {
    this.currentPage = 0;
    this.currentKeyword= form.keyword;
    this.searchProducts();

  }

  searchProducts(){
    this.catalogue.searchProductsByKeyword(this.currentKeyword,this.currentPage, this.size)
      .subscribe(data=> {
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages.valueOf());
        this.productsItems = data;
      }, error => {
        console.log(error);
      })
  }


  onDeleteProduct(p) {
    let conf=confirm("are you sure to delete this product ?");
    if(conf) {
      this.catalogue.deleteProduct(p._links.self.href)
        .subscribe(data=> {
          this.searchProducts()
        }, error => {
          console.log(error);
        })
    }

  }

  onEditProduct(p) {
    let url = p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+ btoa(url)); // endodeBase64 url
  }
}
