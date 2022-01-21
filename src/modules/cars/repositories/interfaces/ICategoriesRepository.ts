import ICreateCategoryDTO from "@modules/cars/dtos/ICreateCategoryDTO";
import Category from "@modules/cars/typeorm/entities/Category";

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  find(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<void>;
}

export default ICategoriesRepository;
