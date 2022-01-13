import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvaliableController } from "@modules/cars/useCases/listAvaliableCar/ListAvaliableCarController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const carsRoutes = Router();

const uploadImageCars = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvaliableController = new ListAvaliableController();
const createCarsSpecificationController =
  new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/avaliable", listAvaliableController.handle);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticate,
  ensureAdmin,
  createCarsSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticate,
  ensureAdmin,
  uploadImageCars.array("images"),
  uploadCarImageController.handle
);

export { carsRoutes };
