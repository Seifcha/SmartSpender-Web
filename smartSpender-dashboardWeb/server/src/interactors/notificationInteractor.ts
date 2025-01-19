import { inject, injectable } from "inversify";
import { INotificationInteractor } from "../interfaces/INotificationInteractor";
import { INotificationRepository } from "../interfaces/INotificationRepository";
import { INTERFACE_TYPE } from "../utils";
import { Buffer } from "buffer";

@injectable()
export class NotificationInteractor implements INotificationInteractor {
  private repository: INotificationRepository;

  constructor(
    @inject(INTERFACE_TYPE.NotificationRepository)
    repository: INotificationRepository
  ) {
    this.repository = repository;
  }

  async getUserEmails(id: number) {
    return await this.repository.getUserEmails(id);
  }

  async ajouterNotification(input: any) {
    await this.repository.create(input);
    // Retourner l'ID de la catégorie nouvellement insérée
  }

  async getNotifications(): Promise<string[]> {
    const notifications = await this.repository.getNotifications();
    const userEmails = notifications.map(
      (notification: any) => notification.userEmail
    );
    return userEmails;
  }
  async ajouterNotifications({ title, body, nomFournisseur, image }) {
    await this.repository.createNotifications({
      title,
      body,
      nomFournisseur,
      image,
    });
    // Retourner l'ID de la catégorie nouvellement insérée
  }
}
