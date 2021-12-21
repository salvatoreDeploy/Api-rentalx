import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRouter } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationRoutes } from "./specifications.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specification", specificationRoutes);
routes.use("/users", userRoutes);
routes.use("/cars", carsRoutes);
routes.use("/rental", rentalRoutes);
routes.use(authenticateRoutes);
routes.use("/password", passwordRouter);

export { routes };
