import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryModel } from '../admin-space/manage-courses/category.model';
import { CategoryService } from '../admin-space/manage-courses/category.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  categoriesList = signal<CategoryModel[]>([]);

  constructor(private categoryService: CategoryService) {
    this.categoriesList.set(this.categoryService.getCategories());
  }
}
