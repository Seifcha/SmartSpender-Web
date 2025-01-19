import { NextFunction, Request, Response } from "express";
import { IPasswordInteractor } from "../interfaces/IPasswordInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

@injectable()
export class PasswordController {
  private interactor: IPasswordInteractor;

  constructor(
    @inject(INTERFACE_TYPE.PasswordInteractor) interactor: IPasswordInteractor
  ) {
    this.interactor = interactor;
  }

  async onForgotPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
      const user = await this.interactor.findUser(email);

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      const token = jwt.sign({ id: user.id }, "jwt_secret_key", {
        expiresIn: "1d",
      });

      const resetPasswordLink = `http://:5173/reset-password/${user.id}/${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "smartspender.tunisie@gmail.com",
          pass: "ywym vjbr zpkm qvzr",
        },
      });

      const mailOptions = {
        from: "smartspender.tunisie@gmail.com",
        to: email,
        subject: "Réinitialisez votre mot de passe",
        text: resetPasswordLink,
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Réinitialisation de mot de passe</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
        
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
        
                td {
                    padding: 10px;
                }
        
                .container {
                    background-color: #f7f7f7;
                    padding: 20px;
                }
        
                .email-wrapper {
                    width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                }
        
                .content {
                    padding: 40px;
                }
        
                h2 {
                    margin-bottom: 30px;
                }
        
                a.button {
                    display: inline-block;
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 3px;
                }
            </style>
        </head>
        
        <body>
    <table class="container">
        <tr>
            <td>
                <table class="email-wrapper">
                    <tr>
                        <td class="content">
                            <h2>Réinitialisation de mot de passe</h2>
                            <p>Bonjour,</p>
                            <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte <strong>Admin</strong> Smart-Spnder. Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
                            <p style="text-align: center; margin-top: 30px;">
                                <a href="${resetPasswordLink}" class="button">Réinitialiser le mot de passe</a>
                            </p>
                            <p>Si vous n'avez pas demandé cette réinitialisation, ignorez simplement cet e-mail. Aucune action supplémentaire n'est requise.</p>
                            <p>Merci,</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
        
        </html>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return res.send({ Status: "Success" });
        }
      });
    } catch (error) {
      res.status(500).json({ Status: "Error sending reset password link" });
    }
  }

  async onResetPassword(req: Request, res: Response, next: NextFunction) {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
      // Vérifier la validité du token
      const decodedToken = jwt.verify(token, "jwt_secret_key");
      const hashedPwd = await bcrypt.hash(password, 10);
      // Convertir id en nombre
      const userId = parseInt(id, 10);

      // Vérifier si userId est valide
      if (isNaN(userId)) {
        return res.status(400).json({ Status: "Invalid user ID" });
      }

      // Mettre à jour le mot de passe dans la couche de données
      const data = this.interactor.resetPassword(userId, hashedPwd);

      // Répondre avec succès
      res.status(200).json(data);
    } catch (error) {
      // Gérer les erreurs
      res.status(400).json({ Status: "Error resetting password" });
    }
  }

  async checkEmailExists(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
      // Recherchez l'utilisateur dans la base de données en fonction de l'adresse e-mail
      const existingUser = await this.interactor.findOne(email);

      if (existingUser) {
        // Si un utilisateur avec cette adresse e-mail existe, renvoyez une réponse indiquant que l'e-mail existe
        return res.json({ exists: true });
      } else {
        // Si aucun utilisateur avec cette adresse e-mail n'existe, renvoyez une réponse indiquant que l'e-mail n'existe pas
        return res.json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking email existence:", error);
      // En cas d'erreur, renvoyez une réponse avec un code d'erreur et un message approprié
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
