import { Routes } from '@angular/router';
import { CategoryList } from './feature/category/category-list/category-list';
import { AddCategory } from './feature/category/add-category/add-category';
import { EditCategory } from './feature/category/edit-category/edit-category';
import { BlogList } from './feature/blogPost/blog-list/blog-list';

export const routes: Routes = [
  {
    path: 'admin/categories',
    component: CategoryList,
  },
  {
    path: 'admin/categories/add',
    component: AddCategory,
  },
  {
    path: 'admin/categories/edit/:id',
    component: EditCategory,
  },
  {
    path: 'admin/blogposts',
    component: BlogList,
  },
];
