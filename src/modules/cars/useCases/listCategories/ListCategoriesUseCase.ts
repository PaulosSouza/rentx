import { inject, injectable } from "tsyringe";

import ICategoriesRepository from "@modules/cars/repositories/interfaces/ICategoriesRepository";
import Category from "@modules/cars/typeorm/entities/Category";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();

    return categories;
  }
}

export default ListCategoriesUseCase;
