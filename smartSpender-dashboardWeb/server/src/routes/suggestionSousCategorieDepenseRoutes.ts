import express from "express";
import { Container } from "inversify";
import { ISuggestionSousCategorieDepenseRepository } from "../interfaces/ISuggestionSousCategorieDepenseRepository";
import { INTERFACE_TYPE } from "../utils";
import { SuggestionSousCategorieDepenseRepository } from "../repositories/suggestionSousCategorieDepenseRepository";
import { ISuggestionSousCategorieDepenseInteractor } from "../interfaces/ISuggestionSousCategorieDepenseInteractor"; // Correction ici
import { SuggestionSousCategorieDepenseController } from "../controllers/suggestionSousCategorieDepenseController";
import { SuggestionSousCategorieDepenseInteractor } from "../interactors/suggestionSousCategorieDepenseInteractor";
import { IMailer } from "../interfaces/IMailer";
import { Mailer } from "../external-libraries/mailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { MessageBroker } from "../external-libraries/messageBroker";
import { CategorieDepenseRepository } from "../repositories/categorieDepenseRepository"; // Ajout ici
import { ICategorieDepenseRepository } from "../interfaces/ICategorieDepenseRepository";
import multer from "multer";
import { storage } from "../index";

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // Set file size limit to 10MB (adjust as needed)
  },
});
const container = new Container();
container.bind<IMailer>(INTERFACE_TYPE.Mailer).to(Mailer);
container.bind<IMessageBroker>(INTERFACE_TYPE.MessageBroker).to(MessageBroker);

container
  .bind<ISuggestionSousCategorieDepenseRepository>(
    INTERFACE_TYPE.SuggestionSousCategorieDepenseRepository
  )
  .to(SuggestionSousCategorieDepenseRepository);

container
  .bind<ISuggestionSousCategorieDepenseInteractor>(
    INTERFACE_TYPE.SuggestionSousCategorieDepenseInteractor
  )
  .to(SuggestionSousCategorieDepenseInteractor); // Correction ici

container
  .bind<SuggestionSousCategorieDepenseController>(
    INTERFACE_TYPE.SuggestionSousCategorieDepenseController
  )
  .to(SuggestionSousCategorieDepenseController);

// Ajout de la liaison pour CategorieDepenseRepository
container
  .bind<ICategorieDepenseRepository>(INTERFACE_TYPE.CategorieDepenseRepository)
  .to(CategorieDepenseRepository);

const suggestionSousCategorieDepenserouter = express.Router();

const controller = container.get<SuggestionSousCategorieDepenseController>(
  INTERFACE_TYPE.SuggestionSousCategorieDepenseController
);

suggestionSousCategorieDepenserouter.get(
  "/suggestions-sous-categories",
  upload.single("image"),
  controller.getSuggestionSousCategories.bind(controller)
);
suggestionSousCategorieDepenserouter.get(
  "/suggestions-sous-categories/:id",
  controller.getSuggestionSousCategorie.bind(controller)
);
suggestionSousCategorieDepenserouter.put(
  "/suggestions-sous-categories/:id",
  upload.single("image"),
  controller.validerSuggestionSousCategorie.bind(controller)
);
suggestionSousCategorieDepenserouter.delete(
  "/suggestions-sous-categories/:id",
  controller.supprimerSuggestionSousCategorie.bind(controller)
);

export default suggestionSousCategorieDepenserouter;
