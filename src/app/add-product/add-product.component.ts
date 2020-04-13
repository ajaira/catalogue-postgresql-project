import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../service/catalogue.service';
import {Router, RouterLink} from '@angular/router';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productAdded: Product;
  mode: number=1;
  constructor(private catalogueService: CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }

  onSaveProduct(product) {
    this.catalogueService.addProduct(product)
      .subscribe(response=>{
        this.productAdded = response;
        //this.router.navigateByUrl("/products");
        this.mode=2;
      }, error => {
        console.log(error);
    })


  }

  onNewProduct() {
    this.mode=1;
  }
}
