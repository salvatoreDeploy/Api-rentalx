import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportcategoryUseCase } from "./importCategoryUseCase";

class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        /* console.log(file); */

        const importCategoryUseCase = container.resolve(ImportcategoryUseCase);

        await importCategoryUseCase.execute(file);

        return response.status(201).send();
    }
}

export { ImportCategoryController };
