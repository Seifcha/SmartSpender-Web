export interface IMailer {
  SendEmail(to: string, product: unknown);
  SendFournisseurEmail(to: string, fournisseur: unknown);
}
