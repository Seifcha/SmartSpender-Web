import { inject, injectable } from "inversify";
import { CmsUser } from "../entities/CmsUser";
import { ICmsUserInteractor } from "../interfaces/ICmsUserInteractor";
import { ICmsUserRepository } from "../interfaces/ICmsUserRepository";
import { IMailer } from "../interfaces/IMailer";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class CmsUserInteractor implements ICmsUserInteractor {
  private repository: ICmsUserRepository;
  private mailer: IMailer;

  constructor(
    @inject(INTERFACE_TYPE.CmsUserRepository)
    repository: ICmsUserRepository,
    @inject(INTERFACE_TYPE.Mailer)
    mailer: IMailer
  ) {
    this.repository = repository;
    this.mailer = mailer;
  }
//
  async createProfile(input: any) {
    const data = await this.repository.create(input);
    // do some checks or other actions
    return data;
  }
//fghfg
  async authenticate(identifier: string, pwd: string) {
    // Logic to authenticate the user
    const user = await this.repository.findByUsernameOrMail(identifier);
    if (user && user.password === pwd) {
      return user; // Authentication successful
    } else {
      return null; // Authentication failed
    }
  }
}

//   async resetPassword(identifier: string, viaEmail: boolean = true) {
//     // Logic to reset password
//     // Check if the identifier is email or username
//     const user = await this.repository.findByUsername(identifier);
//     if (user) {
//       // Generate reset token
//       const resetToken = this.generateResetToken(); // Déclaration de resetToken ici

//       if (viaEmail) {
//           // Update user's resetToken field in the database
//           await this.repository.updateResetCodePhone(user.id, resetToken);
//           // Send reset token to the user's email
//           await this.sendResetTokenByEmail(user.email, resetToken);
//       } else {
//           // Update user's resetCodePhone field in the database
//           await this.repository.updateResetCodePhone(user.id, resetToken);
//           // Send reset token to the user's phone via SMS or other method
//           await this.sendResetTokenByPhone(user.phone, resetToken);
//       }
//   }

// }

// private generateResetToken(): string {
//   // Génère un nombre aléatoire entre 100000 et 999999 (inclus)
//   const token = Math.floor(100000 + Math.random() * 900000);
//   return token.toString();
// }


// private async sendResetTokenByEmail(email: string, resetToken: string) {
//   // Logic to send reset token to user's email
//   try {
//     await this.mailer.SendEmail(email, `Your reset token: ${resetToken}`);
//   } catch (error) {
//     console.error("Error sending reset token email:", error);
//   }
// }
// private async sendResetTokenByPhone(phone: string, resetToken: string) {
//   // Logic to send reset token to user's phone
//   // Example: Send SMS with reset token
// }

// async resetPasswordWithToken(identifier: string, resetToken: string, newPassword: string): Promise<void> {
//   // Logique pour réinitialiser le mot de passe avec le code de réinitialisation
//   const user = await this.repository.findByUsername(identifier);
  
//   if (user) {
//       // Vérifier si le resetToken correspond à l'email ou au téléphone de l'utilisateur
//       if ((user.resetCodePhone && user.resetCodePhone === resetToken) || (user.resetCodeMail && user.resetCodeMail === resetToken)) {
//           // Mettre à jour le mot de passe de l'utilisateur dans la base de données
//           await this.repository.updatePassword(user.id, newPassword);
//           // Effacer le code de réinitialisation dans la base de données
//           await this.repository.clearResetToken(user.id);
//       } else {
//           throw new Error("Invalid reset token");
//       }
//   } else {
//       throw new Error("User not found");
//   }
// }

// }




  
// async resetPassword(identifier: string, viaEmail: boolean = true) {
//   // Logic to reset password
//   // Check if the identifier is email or username
//   const user = await this.repository.findByEmailOrUsername(identifier);
//   if (user) {
//     // Generate reset token
//     const resetToken = this.generateResetToken(); // Déclaration de resetToken ici

//     if (viaEmail) {
//         // Update user's resetToken field in the database
//         await this.repository.updateResetCodePhone(user.id, resetToken);
//         // Send reset token to the user's email
//         await this.sendResetTokenByEmail(user.email, resetToken);
//     } else {
//         // Update user's resetCodePhone field in the database
//         await this.repository.updateResetCodePhone(user.id, resetToken);
//         // Send reset token to the user's phone via SMS or other method
//         await this.sendResetTokenByPhone(user.phone, resetToken);
//     }
// }

// }

// async resetPasswordWithToken(identifier: string, resetToken: string, newPassword: string): Promise<void> {
//   // Logique pour réinitialiser le mot de passe avec le code de réinitialisation
//   const user = await this.repository.findByEmailOrUsername(identifier);
  
//   if (user) {
//       // Vérifier si le resetToken correspond à l'email ou au téléphone de l'utilisateur
//       if ((user.resetCodePhone && user.resetCodePhone === resetToken) || (user.resetCodeMail && user.resetCodeMail === resetToken)) {
//           // Mettre à jour le mot de passe de l'utilisateur dans la base de données
//           await this.repository.updatePassword(user.id, newPassword);
//           // Effacer le code de réinitialisation dans la base de données
//           await this.repository.clearResetToken(user.id);
//       } else {
//           throw new Error("Invalid reset token");
//       }
//   } else {
//       throw new Error("User not found");
//   }
// }