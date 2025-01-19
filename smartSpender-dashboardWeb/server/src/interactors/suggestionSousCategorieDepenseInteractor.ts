import { inject, injectable } from "inversify";
import { ISuggestionSousCategorieDepenseInteractor } from "../interfaces/ISuggestionSousCategorieDepenseInteractor";
import { ISuggestionSousCategorieDepenseRepository } from "../interfaces/ISuggestionSousCategorieDepenseRepository";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { ICategorieDepenseRepository } from "../interfaces/ICategorieDepenseRepository";
import { INTERFACE_TYPE } from "../utils";
import { SousCategorieDepense } from "../entities/SousCategorieDepense";

@injectable()
export class SuggestionSousCategorieDepenseInteractor
  implements ISuggestionSousCategorieDepenseInteractor
{
  private repository: ISuggestionSousCategorieDepenseRepository;
  //   private categorieDepenseRepository: ICategorieDepenseRepository; // Ajout de l'attribut pour le repository de catégorie de dépense

  constructor(
    @inject(INTERFACE_TYPE.SuggestionSousCategorieDepenseRepository)
    repository: ISuggestionSousCategorieDepenseRepository,
    @inject(INTERFACE_TYPE.MessageBroker) broker: IMessageBroker,
    @inject(INTERFACE_TYPE.CategorieDepenseRepository)
    categorieDepenseRepository: ICategorieDepenseRepository
  ) {
    this.repository = repository;
    // this.categorieDepenseRepository = categorieDepenseRepository; // Initialisation de l'attribut
  }

  async getSuggestionSousCategories(limit: number | undefined, offset: number) {
    return await this.repository.findAll(limit, offset);
  }

  async getSuggestionSousCategorie(id: number) {
    return await this.repository.findById(id);
  }

  async validerSuggestionSousCategorie(id: number) {
    const data = await this.repository.update(id);
    return data;
  }

  async supprimerSuggestionSousCategorie(id: number) {
    const success = await this.repository.delete(id);
    // faire des vérifications ou d'autres opérations
    return success;
  }
}
