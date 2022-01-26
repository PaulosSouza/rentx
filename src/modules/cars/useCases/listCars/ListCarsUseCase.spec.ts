import ListCarsUseCase from "./ListCarsUseCase";

let listCarsUsecase: ListCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    listCarsUsecase = new ListCarsUseCase();
  });

  it("should be able to list all available cars", async () => {
    await listCarsUsecase.execute();
  });
});
