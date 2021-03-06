import dayjs from "dayjs";

import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import DayjsDateProvider from "@shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import AppError from "@shared/errors/AppError";

import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new car if there's another opened to the same user", async () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Test",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "test",
        fine_amount: 40,
        category_id: "1234",
        brand: "brand",
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new car if there's another opened to the same car", async () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Test",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "test",
        fine_amount: 40,
        category_id: "1234",
        brand: "brand",
      });

      await createRentalUseCase.execute({
        user_id: "123",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new car with invalid return time", async () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Test",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "test",
        fine_amount: 40,
        category_id: "1234",
        brand: "brand",
      });

      await createRentalUseCase.execute({
        user_id: "123",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
