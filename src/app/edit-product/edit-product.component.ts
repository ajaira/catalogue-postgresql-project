import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../service/catalogue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  currentProduct:Product;
  url:String;
  constructor(private catalogueService: CatalogueService, private route: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
     this.url = atob(this.activateRoute.snapshot.params.id);
    this.catalogueService.getProduct(this.url)
      .subscribe(data =>{
        this.currentProduct = data;
      }, error =>{
        console.log(error);
      })
  }

  onUpdateProduct(data) {
    console.log(data);
    this.catalogueService.editProduct(this.url,data)
      .subscribe(data=>{
        alert("product has been updated with success");
        this.route.navigateByUrl("");
      }, error => {
        console.log(error);
      })
  }
}







