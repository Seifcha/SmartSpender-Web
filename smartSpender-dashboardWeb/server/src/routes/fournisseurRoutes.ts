import express from "express";
import { Container } from "inversify";
import { IFournisseurRepository } from "../interfaces/IFournisseurRepository";
import { INTERFACE_TYPE } from "../utils";
import { FournisseurRepository } from "../repositories/fournisseurRepository";
import { IFournisseurInteractor } from "../interfaces/IFournisseurInetractor";
import { FournisseurInteractor } from "../interactors/fournisseurInteractor";
import { IMailer } from "../interfaces/IMailer";
import { Mailer } from "../external-libraries/mailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { MessageBroker } from "../external-libraries/messageBroker";
import { FournisseurController } from "../controllers/fournisseurController";
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
  .bind<IFournisseurRepository>(INTERFACE_TYPE.FournisseurRepository)
  .to(FournisseurRepository);

container
  .bind<IFournisseurInteractor>(INTERFACE_TYPE.FournisseurInteractor)
  .to(FournisseurInteractor);

container.bind<IMailer>(INTERFACE_TYPE.Mailer).to(Mailer);

container.bind<IMessageBroker>(INTERFACE_TYPE.MessageBroker).to(MessageBroker);

container.bind(INTERFACE_TYPE.FournisseurController).to(FournisseurController);

const router = express.Router();

const controller = container.get<FournisseurController>(
  INTERFACE_TYPE.FournisseurController
);

router.post(
  "/fournisseurs",
  upload.single("logo"),
  controller.ajouterFournisseur.bind(controller)
);
router.get("/fournisseurs", controller.getFournisseurs.bind(controller));
router.get("/fournisseurs/:id", controller.getFournisseur.bind(controller));
router.put(
  "/fournisseurs/:id",
  upload.single("logo"),
  controller.modifierFournisseur.bind(controller)
);
router.delete(
  "/fournisseurs/:id",
  controller.supprimerFournisseur.bind(controller)
);

/////////////////api routes

export default router;
