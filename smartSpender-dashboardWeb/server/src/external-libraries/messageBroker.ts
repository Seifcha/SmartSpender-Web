import { injectable } from "inversify";
import { IMessageBroker } from "../interfaces/IMessageBroker";

@injectable()
export class MessageBroker implements IMessageBroker {
  NotifyToPromotionService(product: unknown) {
    // Logique pour notifier le service de promotion
    console.log("Calling promotion service");
    return true;
  }

  NotifyToFournisseurService(fournisseur: unknown) {
    // Logique pour notifier le service de fournisseur
    console.log("Calling fournisseur service");
    return true;
  }
}
