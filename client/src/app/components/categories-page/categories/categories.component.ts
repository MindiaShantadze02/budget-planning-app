import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category/category.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() categories!: Category[];

  constructor(
    private categoryService: CategoryService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((categories: Category[]) => (
      this.categories = categories
    ));
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categoryService.categories$.next(categories);
    });
  }

  deleteCategory(id: string) {
    this.dialogService.showDeleteDialog('Are you sure you want to delete this category?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.categoryService.deleteCategory(id).subscribe(() => (
          this.categories = this.categories.filter((category: Category) => category._id !== id),
          this.categoryService.categories$.next([...this.categories])
        ));
      }
    });
  }
}
