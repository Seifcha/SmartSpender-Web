import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

@injectable()
export class AuthController {
  private interactor: IAuthInteractor;

  constructor(
    @inject(INTERFACE_TYPE.AuthInteractor) interactor: IAuthInteractor
  ) {
    this.interactor = interactor;
  }

  async onAuthenticate(req: Request, res: Response, next: NextFunction) {
    const { user, pwd } = req.body;
    if (!user || !pwd)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    const foundUser = await this.interactor.authenticate(user);
    if (!foundUser) return res.sendStatus(401);
    console.log(foundUser);
    try {
      const match = await bcrypt.compare(pwd, foundUser.hashedPwd);
      console.log("match: ", match);
      if (match) {
        // create JWTs
        const accessToken = jwt.sign(
          { username: foundUser.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );
        const refreshToken = jwt.sign(
          { username: foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        await this.interactor.saveToken(user, refreshToken);

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
      } else {
        res.sendStatus(401);
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
