import { Fournisseur } from "../entities/Fournisseur";
import Buffer from "buffer";
export interface ISuggestionFournisseurInteractor {
  validerSuggestionFournisseur(id: number);
  supprimerSuggestionFournisseur(id: number);
  getSuggestionFournisseurs(limit: number | undefined, offset: number);
  getSuggestionFournisseur(id: number);
  // a voir si le promise est obligatoir ou non
}
