import express from "express";
import { Container } from "inversify";
import { ISuggestionFournisseurRepository } from "../interfaces/ISuggestionFournisseurRepository";
import { INTERFACE_TYPE } from "../utils";
import { SuggestionFournisseurRepository } from "../repositories/suggestionFournisseurRepository";
import { ISuggestionFournisseurInteractor } from "../interfaces/ISuggestionFournisseurInteractor";
import { SuggestionFournisseurInteractor } from "../interactors/suggestionFournisseurInteractor";

import { SuggestionFournisseurController } from "../controllers/suggestionFournisseurController";
import multer from "multer";
import { storage } from "../index";

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const container = new Container();

container
  .bind<ISuggestionFournisseurRepository>(
    INTERFACE_TYPE.SuggestionFournisseurRepository
  )
  .to(SuggestionFournisseurRepository);

container
  .bind<ISuggestionFournisseurInteractor>(
    INTERFACE_TYPE.SuggestionFournisseurInteractor
  )
  .to(SuggestionFournisseurInteractor);

container
  .bind<SuggestionFournisseurController>(
    INTERFACE_TYPE.SuggestionFournisseurController
  )
  .to(SuggestionFournisseurController);

const suggestionFournisseurRouter = express.Router(); // Renommage de la variable router en suggestionFournisseurRouter

const controller = container.get<SuggestionFournisseurController>(
  INTERFACE_TYPE.SuggestionFournisseurController
);

suggestionFournisseurRouter.get(
  "/suggestions-fournisseurs",
  controller.getSuggestionFournisseurs.bind(controller)
);

suggestionFournisseurRouter.put(
  "/suggestions-fournisseurs/:id",
  upload.single("image"),
  controller.validerSuggestionFournisseur.bind(controller)
);
suggestionFournisseurRouter.delete(
  "/suggestions-fournisseurs/:id",
  controller.supprimerSuggestionFournisseur.bind(controller)
); // suggestionFournisseurRouter.patch("/suggestions-fournisseurs/:id/valider", controller.validerSuggestionFournisseur.bind(controller));

export default suggestionFournisseurRouter; // Exportation du router renommé
