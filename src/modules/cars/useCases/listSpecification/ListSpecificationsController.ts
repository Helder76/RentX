import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "@modules/cars/useCases/listSpecification/ListSpecificationsUseCase";

class ListSpecificationsController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(ListSpecificationsUseCase)
    const all = await listSpecificationUseCase.execute();

    return response.json(all);
  }
}

export { ListSpecificationsController };
