import { mysqlClient } from "../dbConnection";
import { Notification } from "../entities/Notification";
import { Buffer } from "buffer";
import { INotificationRepository } from "../interfaces/INotificationRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class NotificationRepository implements INotificationRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async getUserEmails(idCategorieFournisseur: number): Promise<string[]> {
    let query = `
      SELECT DISTINCT u.email AS userEmail
      FROM users u
      JOIN depenses d ON u.email = d.userEmail
      JOIN categoriesDepenseFournisseur cdf ON d.idCategorieDepense = cdf.idCategorieDepense
      WHERE cdf.idCategorieFournisseur = ? AND u.deleted = 0;
    `;
    const values = [idCategorieFournisseur];

    return new Promise<string[]>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const userEmails = results.map((row: any) => row.userEmail);
          resolve(userEmails);
        }
      });
    });
  }

  async create({
    userEmails,
    title,
    body,
    nomFournisseur,
    image,
  }: {
    userEmails: string[];
    title: string;
    body: string;
    nomFournisseur: string;
    image: Buffer;
  }): Promise<Notification[]> {
    return new Promise<Notification[]>((resolve, reject) => {
      const query = `
        INSERT INTO notifications (userEmail, titre, contenu, nomFournisseur, image, vu) VALUES ?
      `;

      const values = userEmails.map((email) => [
        email,
        title,
        body,
        nomFournisseur,
        image,
        1,
      ]);

      this.connection.query(query, [values], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const insertId = results.insertId;
          const notifications = userEmails.map((email, index) => {
            return new Notification(
              insertId + index,
              new Date(), // Assuming `createdAt` and `updatedAt` will be current timestamp
              new Date(),
              false,
              null,
              email,
              title,
              body,
              image,
              nomFournisseur,
              true
            );
          });

          resolve(notifications);
        }
      });
    });
  }

  async getNotifications(): Promise<any[]> {
    let query = `
      SELECT * FROM notifications WHERE idDepense IS NULL AND idRevenu IS NULL
    `;

    return new Promise<any[]>((resolve, reject) => {
      this.connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async createNotifications({
    title,
    body,
    nomFournisseur,
    image,
  }: {
    userEmails: string[];
    title: string;
    body: string;
    nomFournisseur: string;
    image: Buffer;
  }): Promise<Notification[]> {
    return new Promise<Notification[]>((resolve, reject) => {
      const query = `
        INSERT INTO notifications (titre, contenu, nomFournisseur, image, vu) VALUES (?, ?, ?, ?, ?)
      `;

      const values = [title, body, nomFournisseur, image, 1];

      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const insertId = results.insertId;
          const notification = new Notification(
            insertId,
            new Date(), // Assuming `createdAt` will be the current timestamp
            new Date(), // Assuming `updatedAt` will be the current timestamp
            false, // Assuming `read` property is initially false
            null, // Assuming there's no specific user ID assigned
            "", // No email, since it's for everyone
            title,
            body,
            image,
            nomFournisseur,
            true // Assuming the notification is marked as active
          );

          resolve([notification]);
        }
      });
    });
  }
}
