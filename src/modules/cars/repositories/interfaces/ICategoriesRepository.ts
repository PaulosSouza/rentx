import Category from "../../entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  find(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<void>;
}

export default ICategoriesRepository;
