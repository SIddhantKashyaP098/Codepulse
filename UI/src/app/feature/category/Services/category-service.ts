import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category, updateCategoryRequest } from '../Models/category.model';
import { environment } from '../../../../environments/environment';
import { EditCategory } from '../edit-category/edit-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  editCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  deleteCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  addCategory(category: AddCategoryRequest) {
    this.addCategoryStatus.set('loading');
    this.http.post<void>(`${this.baseUrl}/api/Categories`, category).subscribe({
      next: () => {
        this.addCategoryStatus.set('success');
      },
      error: () => {
        this.addCategoryStatus.set('error');
      },
    });
  }

  getAllCategories() {
    return httpResource<Category[]>(() => `${this.baseUrl}/api/Categories`);
  }

  getcategoriesByid(id: InputSignal<string | undefined>) {
    return httpResource<Category>(() => `${this.baseUrl}/api/categories/${id()}`);
  }

  updateCategory(id: string, updateCategoryRequestdto: updateCategoryRequest) {
    // toh kya karna h first woh socho ..
    this.editCategoryStatus.set('loading');
    this.http
      .put<void>(`${this.baseUrl}/api/categories/${id}`, updateCategoryRequestdto)
      .subscribe({
        next: () => {
          this.editCategoryStatus.set('success');
        },
        error: () => {
          this.editCategoryStatus.set('error');
        },
      });
  }

  deleteCategoryById(id: string) {
    this.deleteCategoryStatus.set('loading');
    this.http.delete<void>(`${this.baseUrl}/api/categories/${id}`).subscribe({
      next: () => {
        this.deleteCategoryStatus.set('success');
      },
      error: () => {
        this.deleteCategoryStatus.set('error');
      },
    });
  }
}
