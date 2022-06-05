import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      "name": "Car1",
      "description": "Description Car 1 ",
      "daily_rate": 110.0,
      "license_plate": "ABC-1235",
      "fine_amount": 40,
      "brand": "Car Brand 1",
      "category_id": "category_id"
    })
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);

  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car2",
      "description": "Description Car 2 ",
      "daily_rate": 110.0,
      "license_plate": "ABC-1236",
      "fine_amount": 40,
      "brand": "Car Brand 2",
      "category_id": "category_id"
    })
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car Brand 2",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car3",
      "description": "Description Car 2 ",
      "daily_rate": 110.0,
      "license_plate": "ABC-1236",
      "fine_amount": 40,
      "brand": "Car Brand 2",
      "category_id": "category_id"
    })
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car3",
      "description": "Description Car 2 ",
      "daily_rate": 110.0,
      "license_plate": "ABC-1236",
      "fine_amount": 40,
      "brand": "Car Brand 2",
      "category_id": "12345"
    })
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });
    expect(cars).toEqual([car]);
  });
})