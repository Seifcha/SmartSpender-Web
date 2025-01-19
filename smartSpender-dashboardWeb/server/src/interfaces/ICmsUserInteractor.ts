export interface ICmsUserInteractor {
    createProfile(userData: any): Promise<any>;
    authenticate(identifier: string, password: string): Promise<any>;
    // resetPassword(identifier: string, viaEmail: boolean): Promise<void>;
    // Ajoutez d'autres méthodes d'interacteur nécessaires ici
}