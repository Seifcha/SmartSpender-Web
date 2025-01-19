import { NextFunction, Request, Response } from "express";
import { ISuggestionCategorieRevenuInteractor } from "../interfaces/ISuggestionCategorieRevenuInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
// import multer from 'multer';
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
@injectable()
export class SuggestionCategorieRevenuController {
  private interactor: ISuggestionCategorieRevenuInteractor;

  constructor(
    @inject(INTERFACE_TYPE.SuggestionCategorieRevenuInteractor)
    interactor: ISuggestionCategorieRevenuInteractor
  ) {
    this.interactor = interactor;
  }

  async getSuggestionCategorieRevenus(
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
      const data = await this.interactor.getSuggestionCategorieRevenus(
        limit,
        offset
      );

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getSuggestionCategorieRevenu(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.interactor.getSuggestionCategorieRevenu(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async validerSuggestionCategorieRevenu(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const data = await this.interactor.validerSuggestionCategorieRevenu(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async supprimerSuggestionCategorieRevenu(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const success = await this.interactor.supprimerSuggestionCategorieRevenu(
        id
      );

      return res.status(200).json({ success });
    } catch (error) {
      next(error);
    }
  }
}
