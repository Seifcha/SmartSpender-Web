import { NextFunction, Request, Response } from "express";
import { IUsersInteractor } from "../interfaces/IUsersInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { User } from "../entities/User"; //

@injectable()
export class UsersController {
  private interactor: IUsersInteractor;

  constructor(
    @inject(INTERFACE_TYPE.UsersInteractor)
    interactor: IUsersInteractor
  ) {
    this.interactor = interactor;
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.interactor.getUser(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      let limit: number | undefined =
        parseInt(req.query.limit as string) || undefined;
      const offset: number = parseInt(req.query.offset as string) || 0;

      if (!limit) {
        limit = undefined; // Définir la limite sur undefined pour récupérer tous les sous categories
      }

      const data = await this.interactor.getUsers(limit, offset);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async revoquerAcces(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      const data = await this.interactor.revoquerAcces(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
