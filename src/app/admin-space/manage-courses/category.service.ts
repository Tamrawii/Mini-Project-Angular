import { Injectable, signal } from '@angular/core';
import { CategoryModel } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesList = signal<CategoryModel[]>([
    {
      id: 1,
      label: 'Web Development',
    },
    {
      id: 2,
      label: 'Mobile Development',
    },
    {
      id: 3,
      label: 'Cloud & DevOps',
    },
    {
      id: 4,
      label: 'Data Science & AI',
    },
    {
      id: 5,
      label: 'Cybersecurity',
    },
  ]);

  getCategories() {
    return this.categoriesList();
  }

  getCategoryById(categoryId: number) {
    return this.categoriesList()[categoryId];
  }
}
