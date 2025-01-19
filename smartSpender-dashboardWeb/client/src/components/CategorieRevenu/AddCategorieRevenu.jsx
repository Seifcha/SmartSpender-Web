import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaArrowLeft } from "react-icons/fa";

export const AddCategorieRevenu = () => {
  // const { auth } = useAuth();
  const [IdCategorieFournisseur, setIdCategorieFournisseur] = useState([]);
  const [categoriesFournisseurs, setCategoriesFournisseurs] = useState([]);
  const [nomCategorie, setNomCategorie] = useState("");
  // const [image, setImage] = useState('');
  const [possedeFournisseurRevenu, setPossedeFournisseurRevenu] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [file, setFile] = useState();

  const togglePossede = () => {
    setPossedeFournisseurRevenu((prev) => !prev);
  };
  useEffect(() => {
    // Charger les catégories de dépenses depuis l'APIi i sprint
    axiosPrivate
      .get("/categories-fournisseurs")
      .then((response) => {
        setCategoriesFournisseurs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories de fournisseur:", error);
      });
  }, []);

  const handleCategorieFournisseurChange = (e, categoryId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Add the category ID to the state if it's checked
      setIdCategorieFournisseur([...IdCategorieFournisseur, categoryId]);
    } else {
      // Remove the category ID from the state if it's unchecked
      setIdCategorieFournisseur(
        IdCategorieFournisseur.filter((id) => id !== categoryId)
      );
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !nomCategorie.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    let possedeFournisseur = possedeFournisseurRevenu;
    if (possedeFournisseurRevenu && IdCategorieFournisseur.length === 0) {
      possedeFournisseur = false;
    }

    const formdata = new FormData();
    formdata.append("IdCategorieFournisseur", IdCategorieFournisseur);
    formdata.append("image", file);
    formdata.append("nomCategorie", nomCategorie);
    formdata.append("possedeFournisseurRevenu", possedeFournisseur);
    try {
      const response = await axiosPrivate.post(
        "/categories-revenus",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Gérez la réponse ou redirigez vers une autre page si nécessaire
      console.log(response.data); // Afficher la réponse pour voir sa structure
      // Vous devez déterminer quelle propriété contient les informations pertinentes dans la réponse

      // Pour l'instant, supposons que la réponse contient une propriété 'success' indiquant si l'ajout a réussi

      console.log("succeeded");
      setNomCategorie("");
      // setImage('');
      setPossedeFournisseurRevenu(false);
      setErrorMessage("");
      // Rediriger vers la page 'categorie-Revenu' après l'ajout réussi
      navigate("/categorie-revenu");
    } catch (error) {
      console.error("Error adding categorie", error);
      // Afficher un message d'erreur en cas d'échec de la requête
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
            to="/categorie-revenu"
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

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="possedeFournisseurRevenu"
                onChange={togglePossede}
                checked={possedeFournisseurRevenu}
              />
              <label
                className="form-check-label"
                htmlFor="possedeFournisseurRevenu"
              >
                Possède fournisseur Revenu
              </label>
            </div>
            {possedeFournisseurRevenu && (
              <div className="mb-3 form-check">
                <label
                  className="form-label"
                  htmlFor="possedeFournisseurRevenu"
                >
                  Choisir les catégories de fournisseurs
                </label>
                {categoriesFournisseurs.map((categorie, index) => (
                  <div className="mb-3 form-check" key={index}>
                    <input
                      value={categorie.IdCategorieFournisseur}
                      type="checkbox"
                      className="form-check-input"
                      id={`categorie${index}`} // unique id for each checkbox
                      checked={IdCategorieFournisseur.includes(
                        categorie.IdCategorieFournisseur
                      )}
                      onChange={(e) =>
                        handleCategorieFournisseurChange(
                          e,
                          categorie.IdCategorieFournisseur
                        )
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`categorie${index}`} // corresponding label id
                    >
                      {categorie.nomCategorie}
                    </label>
                  </div>
                ))}
              </div>
            )}
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

export default AddCategorieRevenu;
