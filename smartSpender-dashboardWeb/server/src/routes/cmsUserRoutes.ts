// import express from "express";
// import { Container } from "inversify";
// import { ICmsUserRepository } from "../interfaces/ICmsUserRepository"
// import { CmsUserRepository } from "../repositories/cmsUserRepository";
// import { ICmsUserInteractor } from "../interfaces/ICmsUserInteractor";
// import { CmsUserInteractor } from "../interactors/cmsUserInteractor";
// import { CmsUserController } from "../controllers/cmsUserController";

// import { IMailer } from "../interfaces/IMailer";
// import { Mailer } from "../external-libraries/mailer";
// import { INTERFACE_TYPE } from "../utils";
// import multer from 'multer';
// import  {storage} from '../index'

//  const upload = multer({
//   storage: storage
// })

// const container = new Container();

// container
//   .bind<ICmsUserRepository>(INTERFACE_TYPE.CmsUserRepository)
//   .to(CmsUserRepository);

// container
//   .bind<ICmsUserInteractor>(INTERFACE_TYPE.CmsUserInteractor)
//   .to(CmsUserInteractor);

// container.bind<IMailer>(INTERFACE_TYPE.Mailer).to(Mailer);

// container
//   .bind(INTERFACE_TYPE.CmsUserController)
//   .to(CmsUserController);

// const router = express.Router();

// const controller = container.get<CmsUserController>(
//   INTERFACE_TYPE.CmsUserController
// );

// router.post("/registerr",  upload.single('image'), controller.onCreateProfile.bind(controller));
// router.post("/authh", controller.onAuthenticate.bind(controller));
// // router.post("/cms-users/reset-password", controller.onResetPassword.bind(controller));
// // router.post("/cms-users/reset-password/token", controller.onResetPasswordWithToken.bind(controller)); // Nouvelle route pour la réinitialisation avec un jeton

// export default router;
