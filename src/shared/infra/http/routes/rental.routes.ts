import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCase/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "@modules/rentals/useCase/listRentalByUser/ListRentalByUserController";
import { ListRentalByUserUseCase } from "@modules/rentals/useCase/listRentalByUser/ListRentalByUserUseCase";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalRoutes.post("/", ensureAuthenticate, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticate,
  devolutionRentalController.handle
);
rentalRoutes.get(
  "/user",
  ensureAuthenticate,
  listRentalByUserController.handle
);

export { rentalRoutes };
