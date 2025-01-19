import { NextFunction, Request, Response } from "express";
import { ICategorieFournisseurInteractor } from "../interfaces/ICategorieFournisseurInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { CategorieFournisseur } from "../entities/CategorieFournisseur";

@injectable()
export class CategorieFournisseurController {
  private interactor: ICategorieFournisseurInteractor;

  constructor(
    @inject(INTERFACE_TYPE.CategorieFournisseurInteractor)
    interactor: ICategorieFournisseurInteractor
  ) {
    this.interactor = interactor;
  }

  async ajouterCategorieFournisseur(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        throw new Error("Aucun fichier trouvé dans la requête");
      }

      const image = req.file.buffer.toString("base64");
      const { nomCategorie } = req.body;

      // Convertir la valeur booléenne en entier

      const data = await this.interactor.ajouterCategorieFournisseur({
        nomCategorie,
        image,
      });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getCategorieFournisseurs(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let limit: number | undefined =
        parseInt(req.query.limit as string) || undefined;
      const offset: number = parseInt(req.query.offset as string) || 0;

      if (!limit) {
        limit = undefined; // Définir la limite sur undefined pour récupérer tous les fournisseurs
      }
      const data = await this.interactor.getCategorieFournisseurs(
        limit,
        offset
      );

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async modifierCategorieFournisseur(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const IdCategorieFournisseur = parseInt(req.params.id);
      let image = "";

      // Vérifier si un fichier a été envoyé
      if (req.file) {
        // Si un fichier est envoyé, convertissez le buffer en base64
        image = req.file.buffer.toString("base64");
      } else if (req.body.image) {
        // Si aucune fichier n'est envoyé mais qu'une image existe déjà dans le corps de la requête, utilisez cette image
        image = req.body.image;
      } else {
        // Si ni le fichier ni l'image existante ne sont fournis, lancez une erreur
        throw new Error("Aucun fichier trouvé dans la requête");
      }
      const { nomCategorie } = req.body;

      const data = await this.interactor.modifierCategorieFournisseur(
        IdCategorieFournisseur,
        nomCategorie,
        image
      );

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCategorieFournisseur(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.interactor.getCategorieFournisseur(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCategoriesFournisseurDepenseAssociees(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const idCategorie = parseInt(req.params.idCategorie);
      const data =
        await this.interactor.getCategoriesFournisseurDepenseAssociees(
          idCategorie
        );
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCategoriesFournisseurRevenuAssociees(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const idCategorie = parseInt(req.params.idCategorie);
      const data =
        await this.interactor.getCategoriesFournisseurRevenuAssociees(
          idCategorie
        );
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async supprimerCategorieFournisseur(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const success = await this.interactor.supprimerCategorieFournisseur(id);

      return res.status(200).json({ success });
    } catch (error) {
      next(error);
    }
  }
}
