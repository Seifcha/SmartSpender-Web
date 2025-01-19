import { NextFunction, Request, Response } from "express";
import { IFournisseurInteractor } from "../interfaces/IFournisseurInetractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { Fournisseur } from "../entities/Fournisseur"; //

@injectable()
export class FournisseurController {
  private interactor: IFournisseurInteractor;

  constructor(
    @inject(INTERFACE_TYPE.FournisseurInteractor)
    interactor: IFournisseurInteractor
  ) {
    this.interactor = interactor;
  }

  async ajouterFournisseur(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new Error("Aucun fichier trouvé dans la requête");
      }

      const logo = req.file.buffer.toString("base64");
      const { nom, phone, mail, idCategorieFournisseur } = req.body;

      // Convertir la valeur booléenne en entier

      const data = await this.interactor.ajouterFournisseur({
        nom,
        logo,
        mail,
        phone,
        idCategorieFournisseur,
      });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getFournisseur(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.interactor.getFournisseur(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async getFournisseurs(req: Request, res: Response, next: NextFunction) {
    try {
      let limit: number | undefined =
        parseInt(req.query.limit as string) || undefined;
      const offset: number = parseInt(req.query.offset as string) || 0;

      if (!limit) {
        limit = undefined; // Définir la limite sur undefined pour récupérer tous les fournisseurs
      }
      const data = await this.interactor.getFournisseurs(limit, offset);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async modifierFournisseur(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      let logo = "";
      if (req.file) {
        logo = req.file.buffer.toString("base64");
      } else if (req.body.logo) {
        logo = req.body.logo;
      } else {
        throw new Error("Aucun fichier trouvé dans la requête");
      }

      const { nom, mail, phone, idCategorieFournisseur } = req.body;

      const data = await this.interactor.modifierFournisseur(
        id,
        nom,
        logo,
        mail,
        phone,
        idCategorieFournisseur
      );

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async supprimerFournisseur(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      const success = await this.interactor.supprimerFournisseur(id);

      return res.status(200).json({ success });
    } catch (error) {
      next(error);
    }
  }

  async validerFournisseur(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      const data = await this.interactor.validerFournisseur(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
