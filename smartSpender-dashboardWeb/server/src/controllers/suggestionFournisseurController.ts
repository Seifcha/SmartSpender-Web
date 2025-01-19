import { NextFunction, Request, Response } from "express";
import { ISuggestionFournisseurInteractor } from "../interfaces/ISuggestionFournisseurInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
// import multer from 'multer';
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
@injectable()
export class SuggestionFournisseurController {
  private interactor: ISuggestionFournisseurInteractor;

  constructor(
    @inject(INTERFACE_TYPE.SuggestionFournisseurInteractor)
    interactor: ISuggestionFournisseurInteractor
  ) {
    this.interactor = interactor;
  }

  async getSuggestionFournisseurs(
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
      const data = await this.interactor.getSuggestionFournisseurs(
        limit,
        offset
      );

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async validerSuggestionFournisseur(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const data = await this.interactor.validerSuggestionFournisseur(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async supprimerSuggestionFournisseur(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const success = await this.interactor.supprimerSuggestionFournisseur(id);

      return res.status(200).json({ success });
    } catch (error) {
      next(error);
    }
  }
}
