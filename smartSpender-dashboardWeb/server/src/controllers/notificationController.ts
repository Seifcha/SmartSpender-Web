import { Buffer } from "buffer";
import { NextFunction, Request, Response } from "express";
import { INotificationInteractor } from "../interfaces/INotificationInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

@injectable()
export class NotificationController {
  private interactor: INotificationInteractor;

  constructor(
    @inject(INTERFACE_TYPE.NotificationInteractor)
    interactor: INotificationInteractor
  ) {
    this.interactor = interactor;
  }

  async ajouterNotification(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      console.log(req.file);

      const idCategorieFournisseur = parseInt(req.params.id);
      if (!req.file) {
        throw new Error("Aucun fichier trouvé dans la requête");
      }

      // Convertir l'image base64 en Buffer
      const image = req.file.buffer.toString("base64");
      const { title, body, nomFournisseur } = req.body;

      const userEmails = await this.interactor.getUserEmails(
        idCategorieFournisseur
      );

      await this.interactor.ajouterNotifications({
        userEmails,
        title,
        body,
        nomFournisseur,
        image,
      });

      return res.status(200).send("Notifications ajoutées avec succès");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async ajouterNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      console.log(req.file);

      if (!req.file) {
        throw new Error("Aucun fichier trouvé dans la requête");
      }

      // Convertir l'image base64 en Buffer
      const image = req.file.buffer.toString("base64");
      const { title, body, nomFournisseur } = req.body;

      await this.interactor.ajouterNotifications({
        title,
        body,
        nomFournisseur,
        image,
      });

      return res.status(200).send("Notifications ajoutées avec succès");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.interactor.getNotifications();
      console.log(data);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
