import CarImage from "@modules/cars/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export default ICarsImagesRepository;
