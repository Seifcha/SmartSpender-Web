import { inject, injectable } from "inversify";
import { ICategorieDepenseInteractor } from "../interfaces/ICategorieDepenseInteractor";
import { ICategorieDepenseRepository } from "../interfaces/ICategorieDepenseRepository";
import { INTERFACE_TYPE } from "../utils";
// import { Buffer } from 'buffer';

@injectable()
export class CategorieDepenseInteractor implements ICategorieDepenseInteractor {
  private repository: ICategorieDepenseRepository;

  constructor(
    @inject(INTERFACE_TYPE.CategorieDepenseRepository)
    repository: ICategorieDepenseRepository
  ) {
    this.repository = repository;
  }
  definirSeuil(id: number, seuil: number) {
    throw new Error("Method not implemented.");
  }
  async getCategorieDepense(id: number) {
    return await this.repository.findById(id);
  }

  async ajouterCategorieDepense(input: any) {
    const data = await this.repository.create(input);
    // Retourner l'ID de la catégorie nouvellement insérée
    return { insertedCategoryId: data.IdCategorie };
  }

  async ajouterCategoriesDepenseFournisseur(
    categoryId: number,
    categoriesFournisseur: number[]
  ) {
    return await this.repository.createCategoriesDepenseFournisseur(
      categoryId,
      categoriesFournisseur
    );
  }

  async modifierCategorieDepense(
    id: number,
    nomCategorie: string,
    image: string,
    possedeFournisseurDepense: number,
    idCategoriesFournisseurSelected: number[]
  ) {
    // Modifier la catégorie de dépense en premier
    await this.repository.modifierCategorieDepense(
      id,
      nomCategorie,
      image,
      possedeFournisseurDepense
    );

    // En fonction de la valeur de possedeFournisseurDepense
    if (possedeFournisseurDepense === 0) {
      // Si possedeFournisseurDepense est 0, supprimer toutes les associations
      await this.repository.supprimerToutesAssociations(id);
    } else {
      // Sinon, supprimer les associations non incluses et ajouter de nouvelles lignes
      await Promise.all([
        this.repository.supprimerAssociationsNonIncluses(
          id,
          idCategoriesFournisseurSelected
        ),
        this.repository.ajouterNouvellesLignesCategoriesDepenseFournisseur(
          id,
          idCategoriesFournisseurSelected
        ),
      ]);
    }
  }

  async supprimerCategorieDepense(id: number): Promise<void> {
    await this.repository.supprimerCategorieDepense(id);
  }

  async getCategorieDepenses(limit: number, offset: number) {
    return await this.repository.findAll(limit, offset);
  }

  async validerCategorieDepense(id: number) {
    const data = await this.repository.validate(id);
    // faire des vérifications ou d'autres opérations
    return data;
  }
}
