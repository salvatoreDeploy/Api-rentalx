import { NextFunction, Request, Response } from "express";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/error/AppError";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.user;
    const usersRespository = new UserRepository();
    const user = await usersRespository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("User is not Admin");
    }

    return next();
}
