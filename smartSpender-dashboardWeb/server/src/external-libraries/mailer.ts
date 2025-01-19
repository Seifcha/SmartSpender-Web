import { injectable } from "inversify";
import { IMailer } from "../interfaces/IMailer";

@injectable()
export class Mailer implements IMailer {
  SendEmail(to: string, product: unknown) {
    // Logique pour envoyer un e-mail
    console.log("sending email");
    return true;
  }

  SendFournisseurEmail(to: string, fournisseur: unknown) {
    // Logique pour envoyer un e-mail spécifique au fournisseur
    console.log("sending fournisseur email");
    return true;
  }
}
