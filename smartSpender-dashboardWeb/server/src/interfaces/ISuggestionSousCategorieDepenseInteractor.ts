import { SousCategorieDepense } from "../entities/SousCategorieDepense";

export interface ISuggestionSousCategorieDepenseInteractor {
  supprimerSuggestionSousCategorie(id: number);
  validerSuggestionSousCategorie(id: number);
  getSuggestionSousCategorie(id: number);
  getSuggestionSousCategories(limit: number | undefined, offset: number);
}
