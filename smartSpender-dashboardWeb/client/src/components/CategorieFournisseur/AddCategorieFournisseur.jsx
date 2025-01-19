import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaArrowLeft } from "react-icons/fa";

export const AddCategorieFournisseur = () => {
  const axiosPrivate = useAxiosPrivate();
  const [nomCategorie, setNomCategorie] = useState("");
  const [file, setFile] = useState(null); // Ajoutez un état pour le fichier sélectionné
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0]); // Mettez à jour l'état avec le fichier sélectionné
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !nomCategorie.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Créez un objet FormData pour envoyer les données
      const formData = new FormData();
      formData.append("image", file);
      formData.append("nomCategorie", nomCategorie);

      // Effectuez une requête POST pour ajouter la nouvelle catégorie de fournisseurs
      const response = await axiosPrivate.post(
        "/categories-fournisseurs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      console.log("Categorie added successfully");

      // Réinitialiser le formulaire après l'ajout réussi
      setNomCategorie("");
      setFile(null);
      setErrorMessage("");
      navigate("/categorie-fournisseur");
    } catch (error) {
      console.error("Error adding categorie", error);
      // Afficher un message d'erreur en cas d'échec de l'ajout
      setErrorMessage(
        "Une erreur s'est produite lors de l'ajout de la catégorie. Veuillez réessayer."
      );
    }
  };

  return (
    <section className="reset-password-container">
      <>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <Link
            to="/categorie-fournisseur"
            className="btn btn-secondary mb-3 text-start"
            style={{ marginRight: "230px" }}
          >
            <FaArrowLeft style={{ marginRight: "5px" }} />
          </Link>
          <form
            encType="multipart/form-data"
            action="upload"
            className="d-grid gap-2"
          >
            <div className="mb-3">
              <label htmlFor="nomCategorie" className="form-label">
                Nom de la catégorie
              </label>
              <input
                type="text"
                className="form-control"
                id="nomCategorie"
                placeholder="Enter nomCategorie"
                required
                value={nomCategorie}
                onChange={(e) => setNomCategorie(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                onChange={handleFile}
                className="form-control"
                id="image"
              />
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="btn btn-success"
            >
              Ajouter
            </button>
            <br />
          </form>
        </div>
      </>
    </section>
  );
};
