import { mysqlClient } from "../dbConnection";
import { CmsUser } from "../entities/CmsUser";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class AuthRepository implements IAuthRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysqlClient();
  }

  async findByUsername(username: string): Promise<CmsUser | null> {
    const query = `SELECT * FROM cmsUsers WHERE username = ?`;
    const values = [username];
    return new Promise<CmsUser | null>((resolve, reject) => {
        this.connection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                // Vérifier s'il y a des résultats
                if (results.length === 0) {
                    resolve(null); // Aucun utilisateur trouvé avec ce nom d'utilisateur
                } else {
                    // Extraire les données du premier résultat trouvé
                    const userData = results[0];
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
                }
            }
        });
    });
}

// } else {
//   // Récupérer l'ID de la catégorie nouvellement insérée
//   const categoryId = results.insertId;

//   // Créer une nouvelle instance de CategorieDepense avec les données insérées
//   const newCategorieDepense = new CategorieDepense(
//       categoryId,
//       new Date(), // Date de création actuelle
//       new Date(), // Date de mise à jour actuelle
//       false, // Aucune suppression
//       new Date(), // Date de suppression nulle
//       nomCategorie,
//       false, // Supposons que la catégorie n'est pas publique par défaut
//       false, // Supposons que la catégorie n'est pas validée par défaut
//       image, // Utiliser le Buffer de l'image
//       possedeFournisseurDepenseInt,
//       0 // Seuil initial à 0
//   );

//   // Résoudre avec la nouvelle instance de CategorieDepense
//   resolve(newCategorieDepense);
// }
  async saveRefreshToken(username: string, refreshToken: string): Promise<void> {
    const query = `UPDATE cmsUsers SET refreshToken = ? WHERE username = ?`;
    const values = [refreshToken, username];
    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
  