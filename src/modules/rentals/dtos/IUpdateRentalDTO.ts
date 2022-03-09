import Rental from "../typeorm/entities/Rental";

interface IUpdateRentalDTO extends Omit<Rental, "created_at" | "updated_at"> {}

export default IUpdateRentalDTO;
