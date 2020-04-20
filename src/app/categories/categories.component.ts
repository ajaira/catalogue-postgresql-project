import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../service/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesItems;
  currentCategory;
  constructor(private catalogueService: CatalogueService, private router:Router) { }

  ngOnInit(): void {
    this.catalogueService.getCategories()
      .subscribe(data => {
        this.categoriesItems = data;
      }, error =>{
        console.log(error);
      })
  }

  onGetProducts(cat) {
    let url = cat._links.products.href;
    this.currentCategory=cat;
    this.router.navigateByUrl("/products/"+btoa(url));
  }
}
