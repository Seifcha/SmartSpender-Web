import { mysqlClient } from "../dbConnection";
import { CmsUser } from "../entities/CmsUser";
import { IRefreshTokenRepository } from "../interfaces/IRefreshTokenRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async findByRefreshToken(refreshToken: string): Promise<CmsUser | null> {
    const query = `SELECT * FROM cmsUsers WHERE refreshToken = ?`;
    const values = [refreshToken];
    return new Promise<CmsUser | null>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            const userData = results[0];
            // Créer un nouvel objet CmsUser à partir des données de la base de données
            const user = new CmsUser(
              userData.idCmsUser,
              userData.nom,
              userData.prenom,
              userData.username,
              userData.password,
              userData.phone,
              userData.email,
              userData.photoProfil,
              userData.resetCodePhone,
              userData.resetCodeMail,
              userData.isMailValidated,
              userData.isPhoneValidated,
              userData.actif,
              userData.refreshToken
            );
            resolve(user);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}

// if (error) {
//   reject(error);
// } else {
//   // Récupérer l'ID de la catégorie nouvellement insérée
//   const categoryId = results.insertId;

//   // Créer une nouvelle instance de CategorieRevenu avec les données insérées
//   const newCategorieRevenu = new CategorieRevenu(
//       categoryId,
//       new Date(), // Date de création actuelle
//       new Date(), // Date de mise à jour actuelle
//       false, // Aucune suppression
//       new Date(), // Date de suppression nulle
//       nomCategorie,
//       false, // Supposons que la catégorie n'est pas publique par défaut
//       false, // Supposons que la catégorie n'est pas validée par défaut
//       image, // Utiliser le Buffer de l'image
//       possedeFournisseurRevenu,

//   );

//   // Résoudre avec la nouvelle instance de CategorieRevenu
//   resolve(newCategorieRevenu);
// }
