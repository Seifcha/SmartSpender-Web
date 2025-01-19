import { inject, injectable } from "inversify";
import { ISousCategorieDepenseInteractor } from "../interfaces/ISousCategorieDepenseInteracteur";
import { ISousCategorieDepenseRepository } from "../interfaces/ISousCategorieDepenseRepository";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { ICategorieDepenseRepository } from "../interfaces/ICategorieDepenseRepository";
import { INTERFACE_TYPE } from "../utils";
import { SousCategorieDepense } from "../entities/SousCategorieDepense";

@injectable()
export class SousCategorieDepenseInteractor
  implements ISousCategorieDepenseInteractor
{
  private repository: ISousCategorieDepenseRepository;
  private broker: IMessageBroker;
  private categorieDepenseRepository: ICategorieDepenseRepository; // Ajout de l'attribut pour le repository de catégorie de dépense

  constructor(
    @inject(INTERFACE_TYPE.SousCategorieDepenseRepository)
    repository: ISousCategorieDepenseRepository,
    @inject(INTERFACE_TYPE.MessageBroker) broker: IMessageBroker,
    @inject(INTERFACE_TYPE.CategorieDepenseRepository)
    categorieDepenseRepository: ICategorieDepenseRepository
  ) {
    this.repository = repository;
    this.broker = broker;
    this.categorieDepenseRepository = categorieDepenseRepository; // Initialisation de l'attribut
  }
  definirSeuil(id: number, seuil: number): Promise<SousCategorieDepense> {
    throw new Error("Method not implemented.");
  }

  async ajouterSousCategorieDepense(input: any) {
    const data = await this.repository.create(input);
    // faire des vérifications
    return data;
  }
  async getNomCategorieDepenseByID(
    idCategorieDepense: number
  ): Promise<string> {
    const categorieDepense = await this.categorieDepenseRepository.findById(
      idCategorieDepense
    );
    if (categorieDepense) {
      return categorieDepense.nomCategorie;
    } else {
      throw new Error("Catégorie de dépense parente non trouvée.");
    }
  }
  async modifierSousCategorieDepense(
    id: number,
    nomSousCategorie: string,
    image: string,
    idCategorieDepense: number
  ) {
    const data = await this.repository.update(
      id,
      nomSousCategorie,
      image,
      idCategorieDepense
    );
    return data;
  }

  async supprimerSousCategorieDepense(id: number): Promise<boolean> {
    const success = await this.repository.delete(id);
    // Faire des vérifications ou d'autres opérations
    return success;
  }

  async validerSousCategorieDepense(id: number): Promise<SousCategorieDepense> {
    const data = await this.repository.validate(id);
    // Faire des vérifications ou d'autres opérations
    return data;
  }

  async getSousCategoriesDepenses(
    limit: number,
    offset: number
  ): Promise<SousCategorieDepense[]> {
    return await this.repository.findAll(limit, offset);
  }
  async getSousCategorie(id: number): Promise<SousCategorieDepense | null> {
    return await this.repository.findById(id);
  }
}
