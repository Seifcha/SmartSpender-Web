import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaArrowLeft } from "react-icons/fa";

export const SendNotif = () => {
  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [nom, setNom] = useState("");

  const [body, setBody] = useState(""); // Ajoutez un état pour le fichier sélectionné
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Créez un objet FormData pour envoyer les données
      const formData = new FormData();
      formData.append("body", body);
      formData.append("title", title);
      formData.append("image", file);
      formData.append("nomFournisseur", nom);

      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
      // Effectuez une requête POST pour ajouter la nouvelle catégorie de fournisseurs
      const response = await axiosPrivate.post(
        `/notification/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      console.log("notification sended successfully");

      // Réinitialiser le formulaire après l'ajout réussi
      setTitle("");
      setBody("null");
      setErrorMessage("");
      navigate("/notifications");
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
            to="/notifications"
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
              <label htmlFor="Nom fournisseur" className="form-label">
                Nom du fournisseur
              </label>
              <input
                type="text"
                className="form-control"
                id="nomCategorie"
                placeholder="Nom du fournisseur"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Titre" className="form-label">
                Titre
              </label>
              <input
                type="text"
                className="form-control"
                id="nomCategorie"
                placeholder="Titre de notification"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Titre" className="form-label">
                Contenu
              </label>
              <textarea
                className="form-control"
                id="nomCategorie"
                placeholder="Bonjour..."
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image" className="form-label">
                Logo du fournisseur
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
              Envoyer
            </button>
            <br />
          </form>
        </div>
      </>
    </section>
  );
};
