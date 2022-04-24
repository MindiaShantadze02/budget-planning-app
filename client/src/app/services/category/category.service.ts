import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/Category';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8000';
  categories$ = new BehaviorSubject<Category[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategory(id: string):Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(category: Category):Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category);
  }

  deleteCategory(id: string):Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/categories/${id}`);
  }

  updateCategory(id: string, updatedCategory: Category):Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/categories/${id}`, updatedCategory);
  }
}
