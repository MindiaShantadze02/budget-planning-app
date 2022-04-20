import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/interfaces/Account';
import { Category } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  categoryForm = new FormGroup({
    title: new FormControl(''),
    categoryType: new FormControl('')
  });

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((categories: Category[]) => {
      this.categories = categories;
    })

    this.categoryService.getCategories().subscribe((categories: Category[]) => (
      this.categoryService.categories$.next(categories)
    ));
  }

  createCategory():void {
    this.categoryService.createCategory(this.categoryForm.value).subscribe((category: Category) => (
      this.categoryService.categories$.next([...this.categories, category])
    ));
  }
}
