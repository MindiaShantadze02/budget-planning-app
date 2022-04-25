import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  currentCategory: Category = {
    _id: '',
    title: '',
    categoryType: ''
  };
  categoryForm = new FormGroup({
    title: new FormControl(''),
    categoryType: new FormControl('')
  });
  buttonText = 'Add Category';
  categoryId = '';
  errors: any = {};

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params['categoryId'];
      if (params['categoryId']) {
        this.buttonText = 'Edit Category';
        this.categoryService.getCategory(params['categoryId']).subscribe((category: Category) => (
          this.currentCategory = category, 
          this.categoryForm = new FormGroup({
            title: new FormControl(category.title, [Validators.required]),
            categoryType: new FormControl(category.categoryType, [Validators.required])
          })
        ));
      }
    });

    this.categoryService.categories$.subscribe((categories: Category[]) => {
      this.categories = categories;
    })

    this.categoryService.getCategories().subscribe((categories: Category[]) => (
      this.categoryService.categories$.next(categories)
    ));
  }

  createCategory() {
    this.categoryService.createCategory(this.categoryForm.value).subscribe((category: Category) => (
      this.categoryService.categories$.next([...this.categories, category]),
      this.router.navigate(['/categories']),
      this.errors = {}
    ),
    err => {
      this.errors = err.error;
    });
  }

  editCategory(id: string) {
    if (this.buttonText === 'Edit Category') {
      this.categoryService.updateCategory(id, this.categoryForm.value).subscribe((category: Category) => (
        this.router.navigate(['/categories']),
        this.errors = {}
      ),
      err => this.errors = err.error);
    }
  }
}
