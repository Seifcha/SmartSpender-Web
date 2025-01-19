import { inject, injectable } from "inversify";
import { IFournisseurInteractor } from "../interfaces/IFournisseurInetractor";
import { IFournisseurRepository } from "../interfaces/IFournisseurRepository";
import { INTERFACE_TYPE } from "../utils";
import { Fournisseur } from "../entities/Fournisseur";

@injectable()
export class FournisseurInteractor implements IFournisseurInteractor {
  private repository: IFournisseurRepository;

  constructor(
    @inject(INTERFACE_TYPE.FournisseurRepository)
    repository: IFournisseurRepository
  ) {
    this.repository = repository;
  }

  async getFournisseur(IdFournisseur: number) {
    return await this.repository.findById(IdFournisseur);
  }

  async ajouterFournisseur(input: any) {
    const data = await this.repository.create(input);
    // faire des vérifications
    return data;
  }

  async modifierFournisseur(
    id: number,
    nom: string,
    logo: string,
    mail: string,
    phone: number,
    idCategorieFournisseur: number
  ) {
    const data = await this.repository.update(
      id,
      nom,
      logo,
      mail,
      phone,
      idCategorieFournisseur
    );
    return data;
  }

  async supprimerFournisseur(IdFournisseur: number) {
    const success = await this.repository.delete(IdFournisseur);
    // faire des vérifications ou d'autres opérations
    return success;
  }
  async getFournisseurs(limit: number, offset: number) {
    return await this.repository.findAll(limit, offset);
  }

  async validerFournisseur(IdFournisseur: number) {
    const data = await this.repository.validate(IdFournisseur);
    // faire des vérifications ou d'autres opérations
    return data;
  }
}
