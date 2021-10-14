import { inject, injectable } from "tsyringe";

import Category from "../../entities/Category";
import ICategoryRepository from "../../repositories/interfaces/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();

    return categories;
  }
}

export default ListCategoriesUseCase;
