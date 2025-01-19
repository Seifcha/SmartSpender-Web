import { NextFunction, Request, Response } from "express";
import { ICategorieRevenuInteractor } from "../interfaces/ICategorieRevenuInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import multer from "multer";

@injectable()
export class CategorieRevenuController {
  private interactor: ICategorieRevenuInteractor;

  constructor(
    @inject(INTERFACE_TYPE.CategorieRevenuInteractor)
    interactor: ICategorieRevenuInteractor
  ) {
    this.interactor = interactor;
  }

  async ajouterCategorieRevenu(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        throw new Error("Aucun fichier trouvé dans la requête");
      }

      const image = req.file.buffer.toString("base64");
      const { nomCategorie, possedeFournisseurRevenu, IdCategorieFournisseur } =
        req.body;

      // Convertir la valeur booléenne en entier
      let possedeFournisseurRevenuInt = 0;
      if (possedeFournisseurRevenu === "true") {
        possedeFournisseurRevenuInt = 1;
      }

      let insertedCategoryId;
      const interactorResponse = await this.interactor.ajouterCategorieRevenu({
        nomCategorie,
        image,
        possedeFournisseurRevenuInt,
      });

      insertedCategoryId = interactorResponse.insertedCategoryId;

      // Si possedeFournisseurRevenu est vrai et IdCategorieFournisseur est une chaîne non vide, convertir en tableau et ajouter des entrées dans la table categoriesRevenuFournisseur
      if (
        possedeFournisseurRevenuInt === 1 &&
        IdCategorieFournisseur &&
        IdCategorieFournisseur.trim() !== ""
      ) {
        const categoriesArray = IdCategorieFournisseur.split(",").map(Number);

        await this.interactor.ajouterCategoriesRevenuFournisseur(
          insertedCategoryId,
          categoriesArray
        );
      }

      return res.status(200).json(interactorResponse);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getCategorieRevenu(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.interactor.getCategorieRevenu(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCategorieRevenus(req: Request, res: Response, next: NextFunction) {
    try {
      let limit: number | undefined =
        parseInt(req.query.limit as string) || undefined;
      const offset: number = parseInt(req.query.offset as string) || 0;

      if (!limit) {
        limit = undefined; // Définir la limite sur undefined pour récupérer tous les fournisseurs
      }
      console.log(req.body.image);
      const data = await this.interactor.getCategorieRevenus(limit, offset);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async modifierCategorieRevenu(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      let image = "";

      // Vérifier si un fichier a été envoyé
      if (req.body.image) {
        image = req.body.image;
      } else if (req.file) {
        image = req.file.buffer.toString("base64");
      } else {
        throw new Error("Aucun fichier trouvé dans la requête");
      }

      const {
        nomCategorie,
        possedeFournisseurRevenu,
        idCategoriesFournisseurSelected,
      } = req.body;

      // Convertir idCategoriesFournisseurSelected en tableau de nombres
      const idCategoriesFournisseurSelectedArray = JSON.parse(
        idCategoriesFournisseurSelected
      );
      if (
        Array.isArray(idCategoriesFournisseurSelectedArray) &&
        idCategoriesFournisseurSelectedArray.every(
          (element) => typeof element === "number"
        )
      ) {
        // Le contenu est un tableau d'entiers
        console.log(
          "Le contenu est un tableau d'entiers :",
          idCategoriesFournisseurSelectedArray
        );
      } else {
        // Le contenu n'est pas conforme aux attentes
        console.error(
          "Le contenu n'est pas un tableau d'entiers :",
          idCategoriesFournisseurSelectedArray
        );
      }

      // console.log(idCategoriesFournisseurSelectedArray);
      // console.log(typeof idCategoriesFournisseurSelectedArray);
      const possedeFournisseurRevenuInt =
        possedeFournisseurRevenu === "true" ? 1 : 0;

      await this.interactor.modifierCategorieRevenu(
        id,
        nomCategorie,
        image,
        possedeFournisseurRevenuInt,
        idCategoriesFournisseurSelectedArray
      );

      return res
        .status(200)
        .json({ message: "Catégorie de dépense modifiée avec succès" });
    } catch (error) {
      next(error);
    }
  }

  async supprimerCategorieRevenu(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      await this.interactor.supprimerCategorieRevenu(id);
      res
        .status(200)
        .json({ message: "Catégorie de dépense supprimée avec succès." });
    } catch (error) {
      next(error);
    }
  }

  async validerCategorieRevenu(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const data = await this.interactor.validerCategorieRevenu(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
