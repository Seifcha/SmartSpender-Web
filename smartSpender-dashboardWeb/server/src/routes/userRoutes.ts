import express from "express";
import { Container } from "inversify";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { INTERFACE_TYPE } from "../utils";
import { UsersRepository } from "../repositories/UsersRepository";
import { IUsersInteractor } from "../interfaces/IUsersInteractor";
import { UsersInteractor } from "../interactors/UsersInteractor";

import { UsersController } from "../controllers/UsersController";
import multer from "multer";
import { storage } from "../index";

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const container = new Container();

container
  .bind<IUsersRepository>(INTERFACE_TYPE.UsersRepository)
  .to(UsersRepository);

container
  .bind<IUsersInteractor>(INTERFACE_TYPE.UsersInteractor)
  .to(UsersInteractor);

container
  .bind<UsersController>(INTERFACE_TYPE.UsersController)
  .to(UsersController);

const router = express.Router(); // Renommage de la variable router en categorieRevenuRouter

const controller = container.get<UsersController>(
  INTERFACE_TYPE.UsersController
);

router.get("/users", controller.getUsers.bind(controller));
router.put(
  "/user/:id",
  upload.single("image"),
  controller.revoquerAcces.bind(controller)
);

router.get("/user/:id", controller.getUser.bind(controller));

export default router;
