import { NextFunction, Request, Response } from "express";
import { ISuggestionSousCategorieDepenseInteractor } from "../interfaces/ISuggestionSousCategorieDepenseInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { SousCategorieDepense } from "../entities/SousCategorieDepense";

@injectable()
export class SuggestionSousCategorieDepenseController {
  private interactor: ISuggestionSousCategorieDepenseInteractor;

  constructor(
    @inject(INTERFACE_TYPE.SuggestionSousCategorieDepenseInteractor)
    interactor: ISuggestionSousCategorieDepenseInteractor
  ) {
    this.interactor = interactor;
  }
  async getSuggestionSousCategories(
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
      const data = await this.interactor.getSuggestionSousCategories(
        limit,
        offset
      );

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getSuggestionSousCategorie(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.interactor.getSuggestionSousCategorie(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async validerSuggestionSousCategorie(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const data = await this.interactor.validerSuggestionSousCategorie(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async supprimerSuggestionSousCategorie(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const success = await this.interactor.supprimerSuggestionSousCategorie(
        id
      );

      return res.status(200).json({ success });
    } catch (error) {
      next(error);
    }
  }
}
