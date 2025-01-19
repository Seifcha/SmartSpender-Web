import { inject, injectable } from "inversify";
import { ICategorieFournisseurInteractor } from "../interfaces/ICategorieFournisseurInteractor";
import { ICategorieFournisseurRepository } from "../interfaces/ICategorieFournisseurRepository";
import { IMailer } from "../interfaces/IMailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { INTERFACE_TYPE } from "../utils";
import { CategorieFournisseur } from "../entities/CategorieFournisseur";
import { Buffer } from "buffer";

@injectable()
export class CategorieFournisseurInteractor
  implements ICategorieFournisseurInteractor
{
  private repository: ICategorieFournisseurRepository;
  private mailer: IMailer;
  private broker: IMessageBroker;

  constructor(
    @inject(INTERFACE_TYPE.CategorieFournisseurRepository)
    repository: ICategorieFournisseurRepository,
    @inject(INTERFACE_TYPE.Mailer) mailer: IMailer,
    @inject(INTERFACE_TYPE.MessageBroker) broker: IMessageBroker
  ) {
    this.repository = repository;
    this.mailer = mailer;
    this.broker = broker;
  }
  async getCategorieFournisseur(id: number) {
    return await this.repository.findById(id);
  }

  async getCategoriesFournisseurDepenseAssociees(id: number) {
    return await this.repository.findByCategorieDepense(id);
  }

  async getCategoriesFournisseurRevenuAssociees(id: number) {
    return await this.repository.findByCategorieRevenu(id);
  }

  async ajouterCategorieFournisseur(input: any) {
    const data = await this.repository.create(input);
    // faire des vérifications
    return data;
  }

  async modifierCategorieFournisseur(
    IdCategorieFournisseur: number,
    nomCategorie: string,
    image: string
  ) {
    const data = await this.repository.update(
      IdCategorieFournisseur,
      nomCategorie,
      image
    );
    return data;
  }

  async getCategorieFournisseurs(limit: number, offset: number) {
    return await this.repository.findAll(limit, offset);
  }

  async supprimerCategorieFournisseur(id: number) {
    const success = await this.repository.delete(id);
    // faire des vérifications ou d'autres opérations
    return success;
  }
}
