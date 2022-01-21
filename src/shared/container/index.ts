import { container } from "tsyringe";

import IUsersRepository from "@modules/accounts/repositories/interfaces/IUsersRepository";
import UsersRepository from "@modules/accounts/typeorm/repositories/UsersRepository";
import ICarsRepository from "@modules/cars/repositories/interfaces/ICarsRepository";
import ICategoriesRepository from "@modules/cars/repositories/interfaces/ICategoriesRepository";
import ISpecificationsRepository from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import CarsRepository from "@modules/cars/typeorm/repositories/CarsRepository";
import CategoriesRepository from "@modules/cars/typeorm/repositories/CategoriesRepository";
import SpecificationsRepository from "@modules/cars/typeorm/repositories/SpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
