import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Importez le hook useAuth
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaArrowLeft } from "react-icons/fa";

export const AddCategorieDepense = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth(); // Récupérez le jeton d'accès à partir du contexte d'authentification
  const [IdCategorieFournisseur, setIdCategorieFournisseur] = useState([]);
  const [categoriesFournisseurs, setCategoriesFournisseurs] = useState([]);
  const [nomCategorie, setNomCategorie] = useState("");
  // const [image, setImage] = useState('');
  const [possedeFournisseurDepense, setPossedeFournisseurDepense] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const shouldRefresh = localStorage.getItem("shouldRefreshHome");
    if (shouldRefresh === "true") {
      localStorage.removeItem("shouldRefreshHome");
      window.location.reload();
    } else {
      // Charger les catégories de dépenses depuis l'API
      axiosPrivate
        .get("/categories-fournisseurs")
        .then((response) => {
          setCategoriesFournisseurs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories de fournisseur:", error);
        });
    }
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

  const togglePossede = () => {
    setPossedeFournisseurDepense((prev) => !prev);
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

    let possedeFournisseur = possedeFournisseurDepense;
    if (possedeFournisseurDepense && IdCategorieFournisseur.length === 0) {
      possedeFournisseur = false;
    }
    const formdata = new FormData();
    formdata.append("IdCategorieFournisseur", IdCategorieFournisseur);
    formdata.append("image", file);
    formdata.append("nomCategorie", nomCategorie);
    formdata.append("possedeFournisseurDepense", possedeFournisseur);

    // Effectuez une requête POST pour ajouter la nouvelle catégorie de dépenses
    try {
      const response = await axiosPrivate.post(
        "/categories-depenses",
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
      setPossedeFournisseurDepense(false);
      setErrorMessage("");
      // Rediriger vers la page 'categorie-depense' après l'ajout réussi
      navigate("/categorie-depense");
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
            to="/categorie-depense"
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
            {/* <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" className="form-control" id="image" onChange={handleImageChange} />
                    </div> */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="possedeFournisseurDepense"
                onChange={togglePossede}
                checked={possedeFournisseurDepense}
              />
              <label
                className="form-check-label"
                htmlFor="possedeFournisseurDepense"
              >
                Possède fournisseur depense
              </label>
            </div>
            {possedeFournisseurDepense && (
              <div className="mb-3 form-check">
                <label
                  className="form-label"
                  htmlFor="possedeFournisseurDepense"
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

export default AddCategorieDepense;
