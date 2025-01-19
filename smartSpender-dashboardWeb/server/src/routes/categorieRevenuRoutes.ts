import express from "express";
import { Container } from "inversify";
import { ICategorieRevenuRepository } from "../interfaces/ICategorieRevenuRepository";
import { INTERFACE_TYPE } from "../utils";
import { CategorieRevenuRepository } from "../repositories/categorieRevenuRepository";
import { ICategorieRevenuInteractor } from "../interfaces/ICategorieRevenuInteractor";
import { CategorieRevenuInteractor } from "../interactors/categorieRevenuInteractor";
import { IMailer } from "../interfaces/IMailer";
import { Mailer } from "../external-libraries/mailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { MessageBroker } from "../external-libraries/messageBroker";
import { CategorieRevenuController } from "../controllers/categorieRevenuController";
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
  .bind<ICategorieRevenuRepository>(INTERFACE_TYPE.CategorieRevenuRepository)
  .to(CategorieRevenuRepository);

container
  .bind<ICategorieRevenuInteractor>(INTERFACE_TYPE.CategorieRevenuInteractor)
  .to(CategorieRevenuInteractor);

container.bind<IMailer>(INTERFACE_TYPE.Mailer).to(Mailer);

container.bind<IMessageBroker>(INTERFACE_TYPE.MessageBroker).to(MessageBroker);

container
  .bind<CategorieRevenuController>(INTERFACE_TYPE.CategorieRevenuController)
  .to(CategorieRevenuController);

const router = express.Router();

const controller = container.get<CategorieRevenuController>(
  INTERFACE_TYPE.CategorieRevenuController
);
router.post(
  "/categories-revenus",
  upload.single("image"),
  controller.ajouterCategorieRevenu.bind(controller)
);
router.get(
  "/categories-revenus",
  controller.getCategorieRevenus.bind(controller)
);
router.put(
  "/categories-revenus/:id",
  upload.single("image"),
  controller.modifierCategorieRevenu.bind(controller)
);
router.delete(
  "/categories-revenus/:id",
  controller.supprimerCategorieRevenu.bind(controller)
);
router.patch(
  "/categories-revenus/:id/valider",
  controller.validerCategorieRevenu.bind(controller)
);
router.get(
  "/categories-revenus/:id",
  controller.getCategorieRevenu.bind(controller)
);

export default router;
