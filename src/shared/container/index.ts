import { container } from "tsyringe";

import "@shared/container/provider";

import IUsersRepository from "@modules/accounts/repositories/interfaces/IUsersRepository";
import IUsersTokensRepository from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";
import UsersRepository from "@modules/accounts/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "@modules/accounts/typeorm/repositories/UsersTokensRepository";
import ICarsImagesRepository from "@modules/cars/repositories/interfaces/ICarsImagesRepository";
import ICarsRepository from "@modules/cars/repositories/interfaces/ICarsRepository";
import ICategoriesRepository from "@modules/cars/repositories/interfaces/ICategoriesRepository";
import ISpecificationsRepository from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import CarsImagesRepository from "@modules/cars/typeorm/repositories/CarsImagesRepository";
import CarsRepository from "@modules/cars/typeorm/repositories/CarsRepository";
import CategoriesRepository from "@modules/cars/typeorm/repositories/CategoriesRepository";
import SpecificationsRepository from "@modules/cars/typeorm/repositories/SpecificationsRepository";
import IRentalsRepository from "@modules/rentals/repositories/interfaces/IRentalRepository";
import RentalsRepository from "@modules/rentals/typeorm/repositories/RentalsRepository";

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

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
