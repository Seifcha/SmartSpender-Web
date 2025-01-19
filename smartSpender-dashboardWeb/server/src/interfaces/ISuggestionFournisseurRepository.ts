import { Fournisseur } from "../entities/Fournisseur";
import Buffer from "buffer";
export interface ISuggestionFournisseurRepository {
  delete(id: number): Promise<boolean>;
  findAll(limit: number | undefined, offset: number): Promise<Fournisseur[]>;
  findById(id: number): Promise<Fournisseur | null>;
  update(id: number): Promise<Fournisseur>;
}
