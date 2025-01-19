import express from "express";
import { Container } from "inversify";
import { ISuggestionCategorieDepenseRepository } from "../interfaces/ISuggestionCategorieDepenseRepository";
import { INTERFACE_TYPE } from "../utils";
import { SuggestionCategorieDepenseRepository } from "../repositories/suggestionCategorieDepenseRepository";
import { ISuggestionCategorieDepenseInteractor } from "../interfaces/ISuggestionCategorieDepenseInteractor";
import { SuggestionCategorieDepenseInteractor } from "../interactors/suggestionCategorieDepenseInteractor";

import { SuggestionCategorieDepenseController } from "../controllers/suggestionCategorieDepenseController";
import multer from "multer";
import { storage } from "../index";

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const container = new Container();

container
  .bind<ISuggestionCategorieDepenseRepository>(
    INTERFACE_TYPE.SuggestionCategorieDepenseRepository
  )
  .to(SuggestionCategorieDepenseRepository);

container
  .bind<ISuggestionCategorieDepenseInteractor>(
    INTERFACE_TYPE.SuggestionCategorieDepenseInteractor
  )
  .to(SuggestionCategorieDepenseInteractor);

container
  .bind<SuggestionCategorieDepenseController>(
    INTERFACE_TYPE.SuggestionCategorieDepenseController
  )
  .to(SuggestionCategorieDepenseController);

const suggestionCategorieDepenseRouter = express.Router(); // Renommage de la variable router en suggestionCategorieDepenseRouter

const controller = container.get<SuggestionCategorieDepenseController>(
  INTERFACE_TYPE.SuggestionCategorieDepenseController
);

suggestionCategorieDepenseRouter.get(
  "/suggestions-categories-depenses",
  controller.getSuggestionCategorieDepenses.bind(controller)
);
suggestionCategorieDepenseRouter.get(
  "/suggestions-categories-depenses/:id",
  controller.getSuggestionCategorieDepense.bind(controller)
);

suggestionCategorieDepenseRouter.put(
  "/suggestions-categories-depenses/:id",
  upload.single("image"),
  controller.validerSuggestionCategorieDepense.bind(controller)
);
suggestionCategorieDepenseRouter.delete(
  "/suggestions-categories-depenses/:id",
  controller.supprimerSuggestionCategorieDepense.bind(controller)
);
// suggestionCategorieDepenseRouter.patch("/suggestions-categories-depenses/:id/valider", controller.validerSuggestionCategorieDepense.bind(controller));

export default suggestionCategorieDepenseRouter; // Exportation du router renommé
