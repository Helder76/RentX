import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecification/ListSpecificationsController";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listSpecificationsController.handle
);


export { specificationsRoutes }


