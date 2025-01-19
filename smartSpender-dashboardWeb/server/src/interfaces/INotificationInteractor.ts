import { Notification } from "./../entities/Notification";
import Buffer from "buffer";
export interface INotificationInteractor {
  ajouterNotifications(input: any);
  getUserEmails(id: number);
  ajouterNotifications({ title, body, nomFournisseur, image }: any);
  getNotifications();
  //   modifierNotification(
  //     id: number,
  //     nomCategorie: string,
  //     image: string,
  //     possedeFournisseurDepense: number,
  //     idCategoriesFournisseurSelected: number[]
  //   );

  //   supprimerNotification(id: number): Promise<void>;
  //   validerNotification(id: number);
  //   definirSeuil(id: number, seuil: number);
  //   getNotifications(limit: number | undefined, offset: number);
  //   getNotification(id: number);
  //   // a voir si le promise est obligatoir ou non
  //   ajouterCategoriesDepenseFournisseur(
  //     categoryId: number,
  //     categoriesFournisseur: number[]
  //   );
}
