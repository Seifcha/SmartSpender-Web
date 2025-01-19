import { Notification } from "../entities/Notification";
import { Buffer } from "buffer";

export interface INotificationRepository {
  getUserEmails(idCategorieFournisseur: number): Promise<string[]>;
  create({
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
  }): Promise<Notification[]>;
  getNotifications(): Promise<string[]>;
  createNotifications({
    title,
    body,
    nomFournisseur,
    image,
  }: {
    title: string;
    body: string;
    nomFournisseur: string;
    image: Buffer;
  }): Promise<Notification[]>;
}

//   modifierNotification(
//     id: number,
//     nomCategorie: string,
//     image: string,
//     possedeFournisseurDepense: number
//   );
//   ajouterNouvellesLignesCategoriesDepenseFournisseur(
//     idNotification: number,
//     idCategoriesFournisseurSelected: number[]
//   );
//   supprimerToutesAssociations(idNotification: number);
//   supprimerAssociationsNonIncluses(
//     idNotification: number,
//     idCategoriesFournisseurSelected: number[]
//   );

//   // supprimerNotification(id: number): Promise<void>;
//   // supprimerAssociationsNotification(
//   //   idNotification: number
//   // ): Promise<void>;
//   // supprimerToutesAssociations(idNotification: number): Promise<void>;

//   validate(id: number): Promise<Notification>;
//   findAll(limit: number | undefined, offset: number): Promise<Notification[]>;
//   findById(id: number): Promise<Notification | null>;
//   createCategoriesDepenseFournisseur(
//     categoryId: number,
//     categoriesFournisseur: number[]
//   );
//   supprimerNotification(id: number): Promise<void>;
