import ICreateCategoryDTO from "@modules/cars/dtos/ICreateCategoryDTO";
import Category from "@modules/cars/typeorm/entities/Category";

import ICategoriesRepository from "../interfaces/ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const categoryFounded = this.categories.find(
      (category) => category.name === name
    );

    return categoryFounded;
  }

  async find(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export default CategoriesRepositoryInMemory;
