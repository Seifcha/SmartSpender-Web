import { NextFunction, Request, Response } from "express";
import { IRegisterInteractor } from "../interfaces/IRegisterInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import jwt from "jsonwebtoken";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//
@injectable()
export class RegisterController {
  private interactor: IRegisterInteractor;
  private interactor2: IAuthInteractor;

  constructor(
    @inject(INTERFACE_TYPE.RegisterInteractor) interactor: IRegisterInteractor,
    @inject(INTERFACE_TYPE.AuthInteractor) interactor2: IAuthInteractor
  ) {
    this.interactor = interactor;
    this.interactor2 = interactor2;
  }
  //////////
  async onRegister(req: Request, res: Response, next: NextFunction) {
    const { username, hashedPwd, prenom, nom, phone, email } = req.body;
    let user = username;
    let pwd = hashedPwd;
    if (!user || !pwd)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    // validate logic
    const duplicate = await this.interactor.findByUsername(user, email);
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
      if (!req.file) {
        throw new Error("Aucun fichier trouvé dans la requête");
      }
      const photoProfil = req.file.buffer.toString("base64");

      const hashedPwd = await bcrypt.hash(pwd, 10);
      const newUser = await this.interactor.register({
        username,
        hashedPwd,
        prenom,
        nom,
        phone,
        email,
        photoProfil,
      });
      // create JWTs
      const accessToken = jwt.sign(
        { username: newUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15s" }
      );
      const refreshToken = jwt.sign(
        { username: newUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      //encrypt the password

      //store the new user
      await this.interactor2.saveToken(user, refreshToken);

      res.status(201);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ success: `New user ${user} created!`, accessToken });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  } //

  async getImage(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.params.username;
      const data = await this.interactor.getImage(username);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
