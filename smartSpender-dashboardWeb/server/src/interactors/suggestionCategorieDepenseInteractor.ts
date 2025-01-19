import { inject, injectable } from "inversify";
import { ISuggestionCategorieDepenseInteractor } from "../interfaces/ISuggestionCategorieDepenseInteractor";
import { ISuggestionCategorieDepenseRepository } from "../interfaces/ISuggestionCategorieDepenseRepository";
import { INTERFACE_TYPE } from "../utils";
// import { Buffer } from 'buffer';

@injectable()
export class SuggestionCategorieDepenseInteractor
  implements ISuggestionCategorieDepenseInteractor
{
  private repository: ISuggestionCategorieDepenseRepository;

  constructor(
    @inject(INTERFACE_TYPE.SuggestionCategorieDepenseRepository)
    repository: ISuggestionCategorieDepenseRepository
  ) {
    this.repository = repository;
  }
  async getSuggestionCategorieDepenses(limit: number, offset: number) {
    return await this.repository.findAll(limit, offset);
  }

  async getSuggestionCategorieDepense(id: number) {
    return await this.repository.findById(id);
  }

  async validerSuggestionCategorieDepense(id: number) {
    const data = await this.repository.update(id);
    return data;
  }

  async supprimerSuggestionCategorieDepense(id: number) {
    const success = await this.repository.delete(id);
    // faire des vérifications ou d'autres opérations
    return success;
  }
}
