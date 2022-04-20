import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() categories!: Category[];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((categories: Category[]) => (
      this.categories = categories
    ));
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categoryService.categories$.next(categories);
    });
  }

}
