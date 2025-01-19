import { inject, injectable } from "inversify";
import { ISuggestionFournisseurInteractor } from "../interfaces/ISuggestionFournisseurInteractor";
import { ISuggestionFournisseurRepository } from "../interfaces/ISuggestionFournisseurRepository";
import { INTERFACE_TYPE } from "../utils";
import { Fournisseur } from "../entities/Fournisseur";

@injectable()
export class SuggestionFournisseurInteractor
  implements ISuggestionFournisseurInteractor
{
  private repository: ISuggestionFournisseurRepository;

  constructor(
    @inject(INTERFACE_TYPE.SuggestionFournisseurRepository)
    repository: ISuggestionFournisseurRepository
  ) {
    this.repository = repository;
  }

  async getSuggestionFournisseurs(limit: number, offset: number) {
    return await this.repository.findAll(limit, offset);
  }

  async getSuggestionFournisseur(id: number) {
    return await this.repository.findById(id);
  }

  async validerSuggestionFournisseur(id: number) {
    const data = await this.repository.update(id);
    return data;
  }

  async supprimerSuggestionFournisseur(id: number) {
    const success = await this.repository.delete(id);
    // faire des vérifications ou d'autres opérations
    return success;
  }
}
