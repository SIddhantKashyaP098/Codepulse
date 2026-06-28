import { Component, effect, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddCategoryRequest } from '../Models/category.model';
import { CategoryService } from '../Services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router = inject(Router);
  constructor() {
    effect(() => {
      if (this.categoryService.addCategoryStatus() === 'success') {
        // redirect to category list page
        this.categoryService.addCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);
      }
      if (this.categoryService.addCategoryStatus() === 'error') {
        console.log('error');
      }
    });
  }
  private categoryService = inject(CategoryService);
  addCategoryForm = new FormGroup({
    Name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
  });
  onSubmit() {
    const addCategoryFormValue = this.addCategoryForm.getRawValue();

    const addCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryFormValue.Name,
      urlHandle: addCategoryFormValue.urlHandle,
    };

    this.categoryService.addCategory(addCategoryRequestDto);

    // now u
  }
}
