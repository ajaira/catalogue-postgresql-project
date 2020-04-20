import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../service/catalogue.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categoriesItems;
  mode: String='list-Category';
  currentCategory;

  constructor(private catalogueService: CatalogueService) {
  }

  ngOnInit(): void {
    this.onGetAllCategories();
  }

  onGetAllCategories() {
    this.catalogueService.getCategories()
      .subscribe(data => {
        this.categoriesItems = data;
      }, error => {
        console.log(error);
      });
  }

  onDeleteCategory(cat) {
    let conf = confirm('are you sure to delete this category ?');
    if (conf) {
      this.catalogueService.deleteCategory(cat._links.self.href)
        .subscribe(data => {
          this.onGetAllCategories();
          this.mode='list-Category';
        }, error => {
          console.log(error);
        });
    }


  }

  OnAddCategory() {
    this.mode = 'new-category';
  }

  onSaveCategory(data) {
    this.catalogueService.addCategory(this.catalogueService.host + '/categories', data)
      .subscribe(data => {
        this.onGetAllCategories();
        this.mode='list-Category';
      }, error => {
        console.log(error);
      });
  }

  onEditCategory(cat) {
    this.catalogueService.getCategory(cat._links.self.href)
      .subscribe(data=> {
        this.currentCategory = data;
        this.mode = 'edit-category'
      }, error => {
        console.log('error');
      })

  }

  onUpdateCategory(value) {
    this.catalogueService.editCategory(this.currentCategory._links.self.href, value)
      .subscribe(data => {
        this.onGetAllCategories();
        this.mode='list-Category';
      }, error => {
        console.log(error);
      });
  }
}
