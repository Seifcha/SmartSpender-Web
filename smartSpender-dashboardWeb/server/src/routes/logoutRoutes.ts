import express from "express";
import { Container } from "inversify";
import { ILogoutRepository } from "../interfaces/ILogoutRepository";
import { INTERFACE_TYPE } from "../utils";
import { LogoutRepository } from "../repositories/logoutRepository";
import { ILogoutInteractor } from "../interfaces/ILogoutInteractor";
import { LogoutInteractor } from "../interactors/logoutInteractor";
import { LogoutController } from "../controllers/logoutController";

const container = new Container();

container
  .bind<ILogoutRepository>(INTERFACE_TYPE.LogoutRepository)
  .to(LogoutRepository);

container
  .bind<ILogoutInteractor>(INTERFACE_TYPE.LogoutInteractor)
  .to(LogoutInteractor);

container.bind(INTERFACE_TYPE.LogoutController).to(LogoutController);

const router = express.Router();

const controller = container.get<LogoutController>(
  INTERFACE_TYPE.LogoutController
);

router.get("/logout", controller.onLogout.bind(controller));

export default router;
