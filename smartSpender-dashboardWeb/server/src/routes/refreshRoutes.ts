import express from "express";
import { Container } from "inversify";
import { IRefreshTokenRepository } from "../interfaces/IRefreshTokenRepository";
import { INTERFACE_TYPE } from "../utils";
import { RefreshTokenRepository } from "../repositories/refreshTokenRepository";
import { IRefreshTokenInteractor } from "../interfaces/IRefreshTokenInteractor";
import { RefreshTokenInteractor } from "../interactors/refreshTokenInteractor";
import { RefreshTokenController } from "../controllers/refreshTokenController";

const container = new Container();
//
container
  .bind<IRefreshTokenRepository>(INTERFACE_TYPE.RefreshTokenRepository)
  .to(RefreshTokenRepository);

container
  .bind<IRefreshTokenInteractor>(INTERFACE_TYPE.RefreshTokenInteractor)
  .to(RefreshTokenInteractor);

container
  .bind(INTERFACE_TYPE.RefreshTokenController)
  .to(RefreshTokenController);

const router = express.Router();

const controller = container.get<RefreshTokenController>(
  INTERFACE_TYPE.RefreshTokenController
);

router.get("/refresh", controller.onRefreshToken.bind(controller));

export default router;
