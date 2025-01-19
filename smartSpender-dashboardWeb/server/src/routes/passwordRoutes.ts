import express from "express";
import { Container } from "inversify";
import { IPasswordRepository } from "../interfaces/IPasswordRepository";
import { INTERFACE_TYPE } from "../utils";
import { PasswordRepository } from "../repositories/passwordRepository";
import { IPasswordInteractor } from "../interfaces/IPasswordInteractor";
import { PasswordInteractor } from "../interactors/passwordInteractor";
// import { IMailer } from "../interfaces/IMailer";
// import { Mailer } from "../external-libraries/mailer";
import { PasswordController } from "../controllers/passwordController";

const container = new Container();

container
  .bind<IPasswordRepository>(INTERFACE_TYPE.PasswordRepository)
  .to(PasswordRepository);

container
  .bind<IPasswordInteractor>(INTERFACE_TYPE.PasswordInteractor)
  .to(PasswordInteractor);

container.bind(INTERFACE_TYPE.PasswordController).to(PasswordController);

const router = express.Router();

const controller = container.get<PasswordController>(
  INTERFACE_TYPE.PasswordController
);

router.post("/forgot-password", controller.onForgotPassword.bind(controller));
router.post(
  "/reset-password/:id/:token",
  controller.onResetPassword.bind(controller)
);
router.post(
  "/check-email-exists",
  controller.checkEmailExists.bind(controller)
);
export default router;
