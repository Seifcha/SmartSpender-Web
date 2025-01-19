import { NextFunction, Request, Response } from "express";
import { ISuggestionCategorieDepenseInteractor } from "../interfaces/ISuggestionCategorieDepenseInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
// import multer from 'multer';
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
@injectable()
export class SuggestionCategorieDepenseController {
  private interactor: ISuggestionCategorieDepenseInteractor;

  constructor(
    @inject(INTERFACE_TYPE.SuggestionCategorieDepenseInteractor)
    interactor: ISuggestionCategorieDepenseInteractor
  ) {
    this.interactor = interactor;
  }

  async getSuggestionCategorieDepenses(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // const { id, token } = req.params;

      // const decodedToken = jwt.verify(token, "jwt_secret_key");

      let limit: number | undefined =
        parseInt(req.query.limit as string) || undefined;
      const offset: number = parseInt(req.query.offset as string) || 0;

      if (!limit) {
        limit = undefined; // Définir la limite sur undefined pour récupérer tous les fournisseurs
      }
      const data = await this.interactor.getSuggestionCategorieDepenses(
        limit,
        offset
      );

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getSuggestionCategorieDepense(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.interactor.getSuggestionCategorieDepense(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async validerSuggestionCategorieDepense(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const data = await this.interactor.validerSuggestionCategorieDepense(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async supprimerSuggestionCategorieDepense(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const success = await this.interactor.supprimerSuggestionCategorieDepense(
        id
      );

      return res.status(200).json({ success });
    } catch (error) {
      next(error);
    }
  }
}
