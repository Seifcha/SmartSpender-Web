import { NextFunction, Request, Response } from "express";
import { ILogoutInteractor } from "../interfaces/ILogoutInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
///
@injectable()
export class LogoutController {
  private interactor: ILogoutInteractor;

  constructor(
    @inject(INTERFACE_TYPE.LogoutInteractor) interactor: ILogoutInteractor
  ) {
    this.interactor = interactor;
  }

  async onLogout(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(204); //No content
      const refreshToken = cookies.jwt;

      const foundUser = await this.interactor.find(refreshToken);
      if (!foundUser) {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.sendStatus(204);
      }
      await this.interactor.deleteRefreshToken(foundUser);

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  } //
}
