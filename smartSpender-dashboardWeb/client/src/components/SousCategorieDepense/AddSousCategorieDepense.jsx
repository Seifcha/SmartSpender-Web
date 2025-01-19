import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaArrowLeft } from 'react-icons/fa';

export const AddSousCategorieDepense = () => {
  const { auth } = useAuth();
  const [nomSousCategorie, setNomSousCategorie] = useState("");
  const [imageFile, setImageFile] = useState(null); // État pour stocker le fichier image
  const [categorieParenteId, setCategorieParenteId] = useState("");
  const [categoriesDepenses, setCategoriesDepenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // Charger les catégories de dépenses depuis l'API
    axiosPrivate
      .get("/categories-depenses")
      .then((response) => {
        setCategoriesDepenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories de dépenses:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Créer un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append("nomSousCategorie", nomSousCategorie);
    formData.append("idCategorieDepense", categorieParenteId);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    // j' ai enlevé: 'Authorization': `Bearer ${auth.accessToken}` // Utilisez le jeton d'accès dans l'en-tête
    // Effectuer une requête POST pour ajouter la nouvelle sous-catégorie de dépenses
    axiosPrivate
      .post("/sousCategoriesDepense", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        // Gérer la réponse ou rediriger vers une autre page si nécessaire
        console.log("Sous-catégorie ajoutée avec succès");
        // Réinitialiser le formulaire après l'ajout réussi
        setNomSousCategorie("");
        setImageFile(null);
        setCategorieParenteId("");
        setErrorMessage("");
        navigate("/SousCategorieDepense");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la sous-catégorie:", error);
        // Afficher un message d'erreur en cas d'échec de l'ajout
        setErrorMessage(
          "Une erreur s'est produite lors de l'ajout de la sous-catégorie. Veuillez réessayer."
        );
      });
  };

  return (
    <section className="reset-password-container" >
    <div>
    <Link to="/sousCategorieDepense" className="btn btn-secondary mb-3 text-start"  style={{ marginRight: '230px' }}>
                <FaArrowLeft style={{ marginRight: '5px' }} /> 
            </Link>
      <form className="d-grid gap-2" >
        <div className="mb-3">
          <label htmlFor="nomSousCategorie" className="form-label">
            Nom de la sous-catégorie
          </label>
          <input
            type="text"
            className="form-control"
            id="nomSousCategorie"
            placeholder="Entrez le nom de la sous-catégorie"
            required
            value={nomSousCategorie}
            onChange={(e) => setNomSousCategorie(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categorieParente" className="form-label">
            Catégorie Parente
          </label>
          <select
            className="form-select"
            id="categorieParente"
            value={categorieParenteId}
            onChange={(e) => setCategorieParenteId(e.target.value)}
          >
            <option value="">Choisir une catégorie parente</option>
            {categoriesDepenses.map((categorie) => (
              <option key={categorie.IdCategorie} value={categorie.IdCategorie}>
                {categorie.nomCategorie}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className="btn btn-success"
        >
          Ajouter
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <br />
      </form>
    </div>
    </section>
  );
};
