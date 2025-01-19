export class Fournisseur {
  constructor(
    public readonly IdFournisseur: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deleted: boolean,
    public readonly deletedAt: Date,
    public readonly nom: string,
    public readonly mail: string,
    public readonly phone: string,
    public readonly logo: Buffer,
    public readonly isPublic: boolean,
    public readonly valide: boolean,
    public readonly idCategorieFournisseur: number,
    public readonly userEmail: string
  ) {}
}
