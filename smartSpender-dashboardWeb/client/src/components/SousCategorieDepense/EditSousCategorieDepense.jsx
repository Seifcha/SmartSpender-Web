import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "react-bootstrap"; // Ajoutez cette ligne d'importation
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaArrowLeft } from "react-icons/fa";

const EditSousCategorieDepense = () => {
  const axiosPrivate = useAxiosPrivate();
  const {auth} = useAuth;
  const { id } = useParams();
  const [categoriesDepenses, setCategoriesDepenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [imageHidden, setImageHidden] = useState(false); // State to manage whether the image should be hidden or not
  const [values, setValues] = useState({
    nomSousCategorie: "",
    categorieParentId: 0,
    image: null,
  });
  const [imageChanged, setImageChanged] = useState(false);
  useEffect(() => {
    axiosPrivate
      .get(`sousCategoriesDepense/${id}`)
      .then((res) => {
        const data = res.data;
        setValues({
          ...values,
          nomSousCategorie: data.nomSousCategorie,
          categorieParentId: data.idCategorieDepense,
          image: data.image, // Assurez-vous que l'image est gérée correctement
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues((prevValues) => ({
        ...prevValues,
        image: file,
      }));
      // Hide the image when a new file is selected
      setImageHidden(true);
    }
  };

  useEffect(() => {
    // Charger les catégories de dépenses depuis l'API
    axiosPrivate
      .get(`/categories-depenses/`)
      .then((response) => {
        setCategoriesDepenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories parentes de dépenses:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nomSousCategorie, image, categorieParentId } = values;

    if (!nomSousCategorie.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    // Créer un objet FormData pour envoyer les données du formulaire
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("nomSousCategorie", nomSousCategorie);
      formdata.append("idCategorieDepense", categorieParentId);
      //    if (imageFile) {
      //        formData.append('image', imageFile);
      //    }

      // Effectuer une requête PUT pour mettre à jour la sous-catégorie de dépenses
      axiosPrivate.put(`/sousCategoriesDepense/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // Gérer la réponse ou rediriger vers une autre page si nécessaire
      console.log("Sous-catégorie modifiée avec succès");
      // Réinitialiser le formulaire après l'ajout réussi
      setValues({
        nomSousCategorie: "",
        categorieParentId: 0,
        image: null,
      });
      setErrorMessage("");
      navigate("/SousCategorieDepense");
    } catch (error) {
      console.error("Erreur lors de la modification de la catégorie", error);
      setErrorMessage(
        "Une erreur s'est produite lors de la modification de la catégorie. Veuillez réessayer."
      );
    }
  };

  const getImageSrc = (imageData, mimetype) => {
    const base64Prefix = `data:${mimetype};base64,`;
    return base64Prefix + imageData;
  };
  return (
    <section className="reset-password-container">
      <div>
        <Link
          to="/sousCategorieDepense"
          className="btn btn-secondary mb-3 text-start"
          style={{ marginRight: "230px" }}
        >
          <FaArrowLeft style={{ marginRight: "5px" }} />
        </Link>
        <form encType="multipart/form-data" className="d-grid gap-2">
          <div className="mb-3">
            <label htmlFor="nomSousCategorie" className="form-label">
              Nom de la sous-catégorie
            </label>
            <input
              type="text"
              className="form-control"
              id="nomSousCategorie"
              required
              value={values.nomSousCategorie}
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  nomSousCategorie: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-3">
            {!imageHidden && (
              <div>
                <p>Ancienne image:</p>
                <img
                  src={getImageSrc(values.image, values.mimetype)}
                  alt="Image"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginRight: "10px",
                  }}
                />
              </div>
            )}
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleFile}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categorieParente" className="form-label">
              Catégorie Parente
            </label>
            <select
              className="form-select"
              id="categorieParente"
              value={values.categorieParentId}
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  categorieParentId: e.target.value,
                }))
              }
            >
              <option value="">Sélectionnez une catégorie parente</option>

              {categoriesDepenses.map((categorie) => (
                <option
                  key={categorie.IdCategorie}
                  value={categorie.IdCategorie}
                >
                  {categorie.nomCategorie}
                </option>
              ))}
            </select>
          </div>{" "}
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="btn btn-success"
          >
            Modifier
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default EditSousCategorieDepense;
