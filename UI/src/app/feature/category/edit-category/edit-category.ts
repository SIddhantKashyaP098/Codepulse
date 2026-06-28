import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../Services/category-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateCategoryRequest } from '../Models/category.model';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  private router = inject(Router);
  id = input<string>();
  private categoryService = inject(CategoryService);
  categoryResourceRef = this.categoryService.getcategoriesByid(this.id);
  categoryResponse = this.categoryResourceRef.value;

  editCategoryForm = new FormGroup({
    Name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
  });
  constructor() {
    effect(() => {
      const category = this.categoryResponse(); // so since categoryResponse is signal so with categoryResponse() we are extracting the value

      console.log(category);
      if (category) {
        console.log('patch-value is called');
        this.editCategoryForm.patchValue({
          Name: category.name,
          urlHandle: category.urlHandle,
        });
      }
      if (this.categoryService.editCategoryStatus() === 'success') {
        this.router.navigate(['/admin/categories']);
        this.categoryService.editCategoryStatus.set('idle');
      }
      if (this.categoryService.editCategoryStatus() === 'error') {
        console.log('something went Wrong');
        this.categoryService.editCategoryStatus.set('idle');
      }
      if (this.categoryService.deleteCategoryStatus() === 'success') {
        this.router.navigate(['/admin/categories']);
        this.categoryService.deleteCategoryStatus.set('idle');
      }
      if (this.categoryService.deleteCategoryStatus() === 'error') {
        console.log('something went Wrong');
        this.categoryService.deleteCategoryStatus.set('idle');
      }
    });
  }

  // effectRef = effect(() => {
  //   this.editCategoryForm.controls.Name.patchValue(this.categoryResponse()?.name ?? '');
  //   this.editCategoryForm.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle ?? '');
  // });

  onSubmit() {
    const id = this.id();
    if (!this.editCategoryForm.valid || id == null) return;
    const formvalue = this.editCategoryForm.getRawValue();
    const updateCategoryRequestdto: updateCategoryRequest = {
      name: formvalue.Name,
      urlHandle: formvalue.urlHandle,
    };
    this.categoryService.updateCategory(id, updateCategoryRequestdto);
  }

  delete() {
    const id = this.id();
    if (id == null) return;
    this.categoryService.deleteCategoryById(id);
  }
}
