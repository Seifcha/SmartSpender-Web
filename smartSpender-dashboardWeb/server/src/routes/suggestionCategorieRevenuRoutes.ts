import express from "express";
import { Container } from "inversify";
import { ISuggestionCategorieRevenuRepository } from "../interfaces/ISuggestionCategorieRevenuRepository";
import { INTERFACE_TYPE } from "../utils";
import { SuggestionCategorieRevenuRepository } from "../repositories/suggestionCategorieRevenuRepository";
import { ISuggestionCategorieRevenuInteractor } from "../interfaces/ISuggestionCategorieRevenuInteractor";
import { SuggestionCategorieRevenuInteractor } from "../interactors/suggestionCategorieRevenuInteractor";

import { SuggestionCategorieRevenuController } from "../controllers/suggestionCategorieRevenuController";
import multer from "multer";
import { storage } from "../index";

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const container = new Container();

container
  .bind<ISuggestionCategorieRevenuRepository>(
    INTERFACE_TYPE.SuggestionCategorieRevenuRepository
  )
  .to(SuggestionCategorieRevenuRepository);

container
  .bind<ISuggestionCategorieRevenuInteractor>(
    INTERFACE_TYPE.SuggestionCategorieRevenuInteractor
  )
  .to(SuggestionCategorieRevenuInteractor);

container
  .bind<SuggestionCategorieRevenuController>(
    INTERFACE_TYPE.SuggestionCategorieRevenuController
  )
  .to(SuggestionCategorieRevenuController);

const suggestionCategorieRevenuRouter = express.Router(); // Renommage de la variable router en suggestionCategorieRevenuRouter

const controller = container.get<SuggestionCategorieRevenuController>(
  INTERFACE_TYPE.SuggestionCategorieRevenuController
);

suggestionCategorieRevenuRouter.get(
  "/suggestions-categories-revenus",
  controller.getSuggestionCategorieRevenus.bind(controller)
);
suggestionCategorieRevenuRouter.get(
  "/suggestions-categories-revenus/:id",
  controller.getSuggestionCategorieRevenu.bind(controller)
);

suggestionCategorieRevenuRouter.put(
  "/suggestions-categories-revenus/:id",
  upload.single("image"),
  controller.validerSuggestionCategorieRevenu.bind(controller)
);
suggestionCategorieRevenuRouter.delete(
  "/suggestions-categories-revenus/:id",
  controller.supprimerSuggestionCategorieRevenu.bind(controller)
);
// suggestionCategorieRevenuRouter.patch("/suggestions-categories-revenus/:id/valider", controller.validerSuggestionCategorieRevenu.bind(controller));

export default suggestionCategorieRevenuRouter; // Exportation du router renommé
