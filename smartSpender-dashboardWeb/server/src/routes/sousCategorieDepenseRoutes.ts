import express from "express";
import { Container } from "inversify";
import { ISousCategorieDepenseRepository } from "../interfaces/ISousCategorieDepenseRepository";
import { INTERFACE_TYPE } from "../utils";
import { SousCategorieDepenseRepository } from "../repositories/sousCategorieDepenseRepository";
import { ISousCategorieDepenseInteractor } from "../interfaces/ISousCategorieDepenseInteracteur"; // Correction ici
import { IMailer } from "../interfaces/IMailer";
import { Mailer } from "../external-libraries/mailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { MessageBroker } from "../external-libraries/messageBroker";
import { SousCategorieDepenseController } from "../controllers/sousCategorieDepenseController";
import { SousCategorieDepenseInteractor } from "../interactors/sousCategorieDepenseInteractor";
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

container
  .bind<ISousCategorieDepenseRepository>(
    INTERFACE_TYPE.SousCategorieDepenseRepository
  )
  .to(SousCategorieDepenseRepository);

container
  .bind<ISousCategorieDepenseInteractor>(
    INTERFACE_TYPE.SousCategorieDepenseInteractor
  )
  .to(SousCategorieDepenseInteractor); // Correction ici

container.bind<IMailer>(INTERFACE_TYPE.Mailer).to(Mailer);
container.bind<IMessageBroker>(INTERFACE_TYPE.MessageBroker).to(MessageBroker);

container
  .bind<SousCategorieDepenseController>(
    INTERFACE_TYPE.SousCategorieDepenseController
  )
  .to(SousCategorieDepenseController);

// Ajout de la liaison pour CategorieDepenseRepository
container
  .bind<ICategorieDepenseRepository>(INTERFACE_TYPE.CategorieDepenseRepository)
  .to(CategorieDepenseRepository);

const sousCategorieDepenserouter = express.Router();

const controller = container.get<SousCategorieDepenseController>(
  INTERFACE_TYPE.SousCategorieDepenseController
);

sousCategorieDepenserouter.post(
  "/sousCategoriesDepense",
  upload.single("image"),
  controller.ajouterSousCategorie.bind(controller)
);
sousCategorieDepenserouter.get(
  "/sousCategoriesDepense",
  upload.single("image"),
  controller.getSousCategories.bind(controller)
);
sousCategorieDepenserouter.get(
  "/sousCategoriesDepense/:id",
  controller.getSousCategorie.bind(controller)
);

sousCategorieDepenserouter.put(
  "/sousCategoriesDepense/:id",
  upload.single("image"),
  controller.modifierSousCategorie.bind(controller)
);
sousCategorieDepenserouter.delete(
  "/sousCategoriesDepense/:id",
  controller.supprimerSousCategorie.bind(controller)
);
// sousCategorieDepenserouter.patch(
//   "/sousCategoriesDepense/:id/valider",
//   controller.validerSousCategorie.bind(controller)
// );
// sousCategorieDepenserouter.patch(
//   "/sousCategoriesDepense/:id/seuil",
//   controller.definirSeuil.bind(controller)
// );

export default sousCategorieDepenserouter;
