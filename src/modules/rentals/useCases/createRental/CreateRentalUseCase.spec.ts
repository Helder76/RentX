import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {

  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "67890",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "sdfasdfa",
        expected_return_date: dayAdd24Hours,
      });
      
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "eqwrwerq",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "jkghghjk",
        car_id: "12345",
        expected_return_date: dayAdd24Hours,
      });
      
      await createRentalUseCase.execute({
        user_id: "ytuityui",
        car_id: "12345",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "jkghghjk",
        car_id: "12345",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError)
  });


});