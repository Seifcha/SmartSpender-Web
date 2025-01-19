export interface IMessageBroker {
  NotifyToPromotionService(product: unknown);
  NotifyToFournisseurService(fournisseur: unknown);
}
