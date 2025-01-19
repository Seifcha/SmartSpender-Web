import { inject, injectable } from "inversify";
import { ISuggestionCategorieRevenuInteractor } from "../interfaces/ISuggestionCategorieRevenuInteractor";
import { ISuggestionCategorieRevenuRepository } from "../interfaces/ISuggestionCategorieRevenuRepository";
import { INTERFACE_TYPE } from "../utils";
// import { Buffer } from 'buffer';

@injectable()
export class SuggestionCategorieRevenuInteractor
  implements ISuggestionCategorieRevenuInteractor
{
  private repository: ISuggestionCategorieRevenuRepository;

  constructor(
    @inject(INTERFACE_TYPE.SuggestionCategorieRevenuRepository)
    repository: ISuggestionCategorieRevenuRepository
  ) {
    this.repository = repository;
  }
  async getSuggestionCategorieRevenus(limit: number, offset: number) {
    return await this.repository.findAll(limit, offset);
  }

  async getSuggestionCategorieRevenu(id: number) {
    return await this.repository.findById(id);
  }

  async validerSuggestionCategorieRevenu(id: number) {
    const data = await this.repository.update(id);
    return data;
  }

  async supprimerSuggestionCategorieRevenu(id: number) {
    const success = await this.repository.delete(id);
    // faire des vérifications ou d'autres opérations
    return success;
  }
}
