import { NextFunction, Request, Response } from "express";
import { IRefreshTokenInteractor } from "../interfaces/IRefreshTokenInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";

const jwt = require("jsonwebtoken");
require("dotenv").config();

@injectable()
export class RefreshTokenController {
  private interactor: IRefreshTokenInteractor;

  constructor(
    @inject(INTERFACE_TYPE.RefreshTokenInteractor)
    interactor: IRefreshTokenInteractor
  ) {
    this.interactor = interactor;
  }

  async onRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(401); ///l'errreur hna
      // console.log("gbal cookie");
      const refreshToken = cookies.jwt;
      // console.log("gbal founduser");
      const foundUser = await this.interactor.find(refreshToken);
      // console.log(typeof(foundUser));/////////
      // console.log(foundUser);//////////
      if (!foundUser) return res.sendStatus(403); //Forbidden
      // evaluate jwt
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err || foundUser.username !== decoded.username)
            return res.sendStatus(403);
          const accessToken = jwt.sign(
            { username: decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
          );
          res.json({ accessToken });
        }
      );
    } catch (error) {
      next(error);
    }
  } //
}
