// cmsUserController.ts
import { Request, Response, NextFunction } from "express";
import { CmsUserInteractor } from "../interactors/cmsUserInteractor";
import { injectable, inject } from "inversify";
import { ICmsUserInteractor } from "../interfaces/ICmsUserInteractor";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class CmsUserController {
  private interactor: ICmsUserInteractor;

  constructor(@inject(INTERFACE_TYPE.CmsUserInteractor) interactor: ICmsUserInteractor) {
    this.interactor = interactor;
  }
//
  async onCreateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const data = await this.interactor.createProfile(userData);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onAuthenticate(req: Request, res: Response, next: NextFunction) {
    try {
      // const { identifier, password } = req.body;
      const { identifier, pwd } = req.body;
      const user = await this.interactor.authenticate(identifier, pwd);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    } catch (error) {
      next(error);
    }
  }
}
//   async onResetPassword(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { identifier, viaEmail } = req.body;
//       await this.interactor.resetPassword(identifier, viaEmail);
//       return res.status(200).json({ message: "Reset Code sent successfully" });
//     } catch (error) {
//       next(error);
//     }
//   }

//   // Dans cmsUserController.ts

// async onResetPasswordWithToken(req: Request, res: Response, next: NextFunction) {
//   try {
//       const { identifier, resetToken, newPassword } = req.body;
//       await this.interactor.resetPasswordWithToken(identifier, resetToken, newPassword);
//       return res.status(200).json({ message: "Password reset successfully" });
//   } catch (error) {
//       next(error);
//   }
// }

// }
 

// async onAuthenticate(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { identifier, password } = req.body;
//     const user = await this.interactor.authenticate(identifier, password);
//     if (user) {
//       return res.status(200).json(user);
//     } else {
//       return res.status(401).json({ message: "Authentication failed" });
//     }
//   } catch (error) {
//     next(error);
//   }
