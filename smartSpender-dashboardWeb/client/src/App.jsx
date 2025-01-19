import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./Acceuil";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Missing from "./components/Missing";
import HomeCategorieDepense from "./components/CategorieDepense/Home";
import { AddCategorieDepense } from "./components/CategorieDepense/AddCategorieDepense";
import EditCategorieDepense from "./components/CategorieDepense/EditCategorieDepense";
import HomeCategorieFournisseur from "./components/CategorieFournisseur/Home";
import { AddCategorieFournisseur } from "./components/CategorieFournisseur/AddCategorieFournisseur";
import EditCategorieFournisseur from "./components/CategorieFournisseur/EditCategorieFournisseur";
import HomeCategorieRevenu from "./components/CategorieRevenu/Home";
import { AddCategorieRevenu } from "./components/CategorieRevenu/AddCategorieRevenu";
import EditCategorieRevenu from "./components/CategorieRevenu/EditCategorieRevenu";
import HomeFournisseur from "./components/Fournisseur/Home";
import AddFournisseur from "./components/Fournisseur/AddFournisseur";
import EditFournisseur from "./components/Fournisseur/EditFournisseur";
import HomeSousCategorieDepense from "./components/SousCategorieDepense/Home";
import { AddSousCategorieDepense } from "./components/SousCategorieDepense/AddSousCategorieDepense";
import EditSousCategorieDepense from "./components/SousCategorieDepense/EditSousCategorieDepense";
import HomeUser from "./components/Users/Home";
import RevoquerAcces from "./components/Users/RevoquerAcces";
import EnvoyerCodeReinitialisation from "./components/Users/EnvoyerCode";
import HomeValiderCategorieDepense from "./components/ValiderCategorieDepense/HomeValiderCategorieDepense";
import HomeValiderCategorieRevenu from "./components/ValiderCategorieRevenu/HomeValiderCategorieRevenu";
import HomeValiderFournisseur from "./components/ValiderFournisseur/HomeValiderFournisseur";
import HomeValiderSousCategorie from "./components/ValiderSousCategorie/HomeValiderSousCategorie";
import { SendNotification } from "./components/CategorieFournisseur/SendNotification";
import HomeNotifications from "./components/Notifications/HomeNotification";
import { SendNotif } from "./components/Notifications/SendNotifs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:id/:token" element={<ResetPassword />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Accueil />} />

            <Route path="notifications" element={<HomeNotifications />} />
            <Route path="send-notif" element={<SendNotif />} />
            <Route
              path="categorie-depense"
              element={<HomeCategorieDepense />}
            />

            <Route
              path="create-categorie-depense"
              element={<AddCategorieDepense />}
            />

            <Route
              path="edit-categorie-depense/:id"
              element={<EditCategorieDepense />}
            />

            <Route
              path="categorie-fournisseur"
              element={<HomeCategorieFournisseur />}
            />
            <Route
              path="create-categorie-fournisseur"
              element={<AddCategorieFournisseur />}
            />
            <Route path="send-notif/:id" element={<SendNotification />} />
            <Route
              path="edit-categorie-fournisseur/:id"
              element={<EditCategorieFournisseur />}
            />

            <Route path="categorie-revenu" element={<HomeCategorieRevenu />} />

            <Route
              path="create-categorie-revenu"
              element={<AddCategorieRevenu />}
            />

            <Route
              path="edit-categorie-revenu/:id"
              element={<EditCategorieRevenu />}
            />

            <Route path="fournisseur" element={<HomeFournisseur />} />
            <Route path="create-fournisseur" element={<AddFournisseur />} />
            <Route path="edit-fournisseur/:id" element={<EditFournisseur />} />

            <Route
              path="sousCategorieDepense"
              element={<HomeSousCategorieDepense />}
            />
            <Route
              path="create-SousCategorieDepense"
              element={<AddSousCategorieDepense />}
            />
            <Route
              path="edit-SousCategorieDepense/:id"
              element={<EditSousCategorieDepense />}
            />
            <Route
              path="valider-categories-depense"
              element={<HomeValiderCategorieDepense />}
            />
            <Route
              path="valider-categories-revenu"
              element={<HomeValiderCategorieRevenu />}
            />

            <Route
              path="valider-fournisseurs"
              element={<HomeValiderFournisseur />}
            />
            <Route
              path="valider-sous-categorie"
              element={<HomeValiderSousCategorie />}
            />
            <Route path="register" element={<Register />} />

            <Route path="revoquer-user/:id" element={<RevoquerAcces />} />
            <Route path="users" element={<HomeUser />} />
            <Route
              path="envoyer-code/:id"
              element={<EnvoyerCodeReinitialisation />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
