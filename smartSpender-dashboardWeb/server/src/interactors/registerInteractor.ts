//
import { inject, injectable } from "inversify";
import { IRegisterRepository } from "../interfaces/IRegisterRepository";
import { CmsUser } from "../entities/CmsUser";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class RegisterInteractor {
  private repository: IRegisterRepository;

  constructor(
    @inject(INTERFACE_TYPE.RegisterRepository) repository: IRegisterRepository
  ) {
    this.repository = repository;
  }

  async findByUsername(
    username: string,
    email: string
  ): Promise<CmsUser | null> {
    // Appel de la méthode findByUsername du repository pour trouver l'utilisateur par son nom d'utilisateur
    const user = await this.repository.findByUsername(username, email);
    // Retourner l'utilisateur trouvé ou null s'il n'existe pas
    return user;
  }

  async register(input: any) {
    const savedUser = await this.repository.create(input);
    // faire des vérifications
    return savedUser;
  }

  async getImage(username: string) {
    const image = await this.repository.findImage(username);
    return image;
  }
}
