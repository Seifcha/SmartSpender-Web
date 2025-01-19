import { NextFunction, Request, Response } from "express";
import { ICategorieDepenseInteractor } from "../interfaces/ICategorieDepenseInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
// import multer from 'multer';
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
@injectable()
export class CategorieDepenseController {
  private interactor: ICategorieDepenseInteractor;

  constructor(
    @inject(INTERFACE_TYPE.CategorieDepenseInteractor)
    interactor: ICategorieDepenseInteractor
  ) {
    this.interactor = interactor;
  }

  async ajouterCategorieDepense(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        throw new Error("Aucun fichier trouvé dans la requête");
      }

      const image = req.file.buffer.toString("base64");
      const {
        nomCategorie,
        possedeFournisseurDepense,
        IdCategorieFournisseur,
      } = req.body;

      // Convertir la valeur booléenne en entier
      let possedeFournisseurDepenseInt = 0;
      if (possedeFournisseurDepense === "true") {
        possedeFournisseurDepenseInt = 1;
      }

      let insertedCategoryId;
      const interactorResponse = await this.interactor.ajouterCategorieDepense({
        nomCategorie,
        image,
        possedeFournisseurDepenseInt,
      });

      insertedCategoryId = interactorResponse.insertedCategoryId;

      // Si possedeFournisseurDepense est vrai et IdCategorieFournisseur est une chaîne non vide, convertir en tableau et ajouter des entrées dans la table categoriesDepenseFournisseur
      if (
        possedeFournisseurDepenseInt === 1 &&
        IdCategorieFournisseur &&
        IdCategorieFournisseur.trim() !== ""
      ) {
        const categoriesArray = IdCategorieFournisseur.split(",").map(Number);

        await this.interactor.ajouterCategoriesDepenseFournisseur(
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

  async getCategorieDepense(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.interactor.getCategorieDepense(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCategorieDepenses(req: Request, res: Response, next: NextFunction) {
    try {
      // const { id, token } = req.params;

      // const decodedToken = jwt.verify(token, "jwt_secret_key");

      let limit: number | undefined =
        parseInt(req.query.limit as string) || undefined;
      const offset: number = parseInt(req.query.offset as string) || 0;

      if (!limit) {
        limit = undefined; // Définir la limite sur undefined pour récupérer tous les fournisseurs
      }
      const data = await this.interactor.getCategorieDepenses(limit, offset);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async modifierCategorieDepense(
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
        possedeFournisseurDepense,
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
      const possedeFournisseurDepenseInt =
        possedeFournisseurDepense === "true" ? 1 : 0;

      await this.interactor.modifierCategorieDepense(
        id,
        nomCategorie,
        image,
        possedeFournisseurDepenseInt,
        idCategoriesFournisseurSelectedArray
      );

      return res
        .status(200)
        .json({ message: "Catégorie de dépense modifiée avec succès" });
    } catch (error) {
      next(error);
    }
  }

  async supprimerCategorieDepense(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      await this.interactor.supprimerCategorieDepense(id);
      res
        .status(200)
        .json({ message: "Catégorie de dépense supprimée avec succès." });
    } catch (error) {
      next(error);
    }
  }

  async validerCategorieDepense(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      const data = await this.interactor.validerCategorieDepense(id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async definirSeuil(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const seuil = parseInt(req.body.Seuil);

      const data = await this.interactor.definirSeuil(id, seuil);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
