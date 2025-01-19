export const INTERFACE_TYPE = {
  ProductRepository: Symbol.for("ProductRepository"),
  ProductInteractor: Symbol.for("ProductInteractor"),
  ProductController: Symbol.for("ProductController"),
  Mailer: Symbol.for("Mailer"),
  MessageBroker: Symbol.for("MessageBroker"),
  FournisseurRepository: Symbol.for("FournisseurRepository"),
  FournisseurInteractor: Symbol.for("FournisseurInteractor"),
  FournisseurController: Symbol.for("FournisseurController"),
  CategorieRevenuRepository: Symbol.for("CategorieRevenuRepository"), // Repository de catégorie de revenu
  CategorieRevenuInteractor: Symbol.for("CategorieRevenuInteractor"), // Interactor de catégorie de revenu
  CategorieRevenuController: Symbol.for("CategorieRevenuController"), // Controller de catégorie de revenu
  CategorieDepenseRepository: Symbol.for("CategorieDepenseRepository"), // Repository de catégorie de dépense
  CategorieDepenseInteractor: Symbol.for("CategorieDepenseInteractor"), // Interactor de catégorie de dépense
  CategorieDepenseController: Symbol.for("CategorieDepenseController"), // Controller de catégorie de dépense
  CategorieFournisseurRepository: Symbol.for("CategorieFournisseurRepository"), // Repository de catégorie de fournisseur
  CategorieFournisseurInteractor: Symbol.for("CategorieFournisseurInteractor"), // Interactor de catégorie de fournisseur
  CategorieFournisseurController: Symbol.for("CategorieFournisseurController"), // Controller de catégorie de fournisseur
  SousCategorieDepenseRepository: Symbol.for("SousCategorieDepenseRepository"),
  SousCategorieDepenseInteractor: Symbol.for("SousCategorieDepenseInteractor"),
  SousCategorieDepenseController: Symbol.for("SousCategorieDepenseController"),

  CategorieDepenseFournisseurRepository: Symbol.for(
    "CategorieDepenseFournisseurRepository"
  ), // Repository de catégorie de dépense
  CategorieDepenseFournisseurInteractor: Symbol.for(
    "CategorieDepenseFournisseurInteractor"
  ), // Interactor de catégorie de dépense
  CategorieDepenseFournisseurController: Symbol.for(
    "CategorieDepenseFournisseurController"
  ), // Controller de catégorie de dépense

  CategorieRevenuFournisseurRepository: Symbol.for(
    "CategorieRevenuFournisseurRepository"
  ), // Repository de catégorie de dépense
  CategorieRevenuFournisseurInteractor: Symbol.for(
    "CategorieRevenuFournisseurInteractor"
  ), // Interactor de catégorie de dépense
  CategorieRevenuFournisseurController: Symbol.for(
    "CategorieRevenuFournisseurController"
  ), // Controller de catégorie de dépense

  CmsUserRepository: Symbol.for("CmsUserRepository"),
  CmsUserInteractor: Symbol.for("CmsUserInteractor"),
  CmsUserController: Symbol.for("CmsUserController"),
  PasswordRepository: Symbol.for("PasswordRepository"),
  PasswordInteractor: Symbol.for("PasswordInteractor"),
  PasswordController: Symbol.for("PasswordController"),

  AuthRepository: Symbol.for("AuthRepository"),
  AuthInteractor: Symbol.for("AuthInteractor"),
  AuthController: Symbol.for("AuthController"),

  RegisterRepository: Symbol.for("RegisterRepository"),
  RegisterInteractor: Symbol.for("RegisterInteractor"),
  RegisterController: Symbol.for("RegisterController"),

  RefreshTokenRepository: Symbol.for("RefreshTokenRepository"),
  RefreshTokenInteractor: Symbol.for("RefreshTokenInteractor"),
  RefreshTokenController: Symbol.for("RefreshTokenController"),

  LogoutRepository: Symbol.for("LogoutRepository"),
  LogoutInteractor: Symbol.for("LogoutInteractor"),
  LogoutController: Symbol.for("LogoutController"),

  NotificationRepository: Symbol.for("NotificationRepository"),
  NotificationInteractor: Symbol.for("NotificationInteractor"),
  NotificationController: Symbol.for("NotificationController"),

  SuggestionFournisseurRepository: Symbol.for(
    "SuggestionFournisseurRepository"
  ),
  SuggestionFournisseurInteractor: Symbol.for(
    "SuggestionFournisseurInteractor"
  ),
  SuggestionFournisseurController: Symbol.for(
    "SuggestionFournisseurController"
  ),

  SuggestionCategorieDepenseRepository: Symbol.for(
    "SuggestionCategorieDepenseRepository"
  ), // Repository de catégorie de dépense
  SuggestionCategorieDepenseInteractor: Symbol.for(
    "SuggestionCategorieDepenseInteractor"
  ), // Interactor de catégorie de dépense
  SuggestionCategorieDepenseController: Symbol.for(
    "SuggestionCategorieDepenseController"
  ),

  SuggestionSousCategorieDepenseRepository: Symbol.for(
    "SuggestionSousCategorieDepenseRepository"
  ),
  SuggestionSousCategorieDepenseInteractor: Symbol.for(
    "SuggestionSousCategorieDepenseInteractor"
  ),
  SuggestionSousCategorieDepenseController: Symbol.for(
    "SuggestionSousCategorieDepenseController"
  ),

  SuggestionCategorieRevenuRepository: Symbol.for(
    "SuggestionCategorieRevenuRepository"
  ), // Repository de catégorie de revenu
  SuggestionCategorieRevenuInteractor: Symbol.for(
    "SuggestionCategorieRevenuInteractor"
  ), // Interactor de catégorie de revenu
  SuggestionCategorieRevenuController: Symbol.for(
    "SuggestionCategorieRevenuController"
  ), // Controller de catégorie de revenu

  UsersController: Symbol.for("UsersController"),
  UsersInteractor: Symbol.for("UsersInteractor"),
  UsersRepository: Symbol.for("UsersRepository"),
};
