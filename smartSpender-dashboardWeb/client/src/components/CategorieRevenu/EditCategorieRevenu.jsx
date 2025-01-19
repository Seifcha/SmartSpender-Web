import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // Importez le hook useAuth
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaArrowLeft } from "react-icons/fa";

const EditCategorieRevenu = () => {
  const axiosPrivate = useAxiosPrivate();

  const { id } = useParams();
  const [values, setValues] = useState({
    nomCategorie: "",
    possedeFournisseurRevenu: false,
    image: null,
  });
  const [categoriesFournisseur, setCategoriesFournisseur] = useState([]);
  const [
    idCategoriesFournisseurSelectionnes,
    setIdCategoriesFournisseurSelectionnes,
  ] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [imageHidden, setImageHidden] = useState(false); // State to manage whether the image should be hidden or not

  useEffect(() => {
    axiosPrivate
      .get(`/categories-revenus/${id}`)
      .then((res) => {
        const data = res.data;
        setValues({
          ...values,
          nomCategorie: data.nomCategorie,
          possedeFournisseurRevenu: data.possedeFournisseurRevenuInt,
          image: data.image,
        });
      })
      .catch((err) => console.log(err));

    axiosPrivate.get("/categories-fournisseurs").then((res) => {
      const data = res.data;
      setCategoriesFournisseur(data);
    });

    axiosPrivate.get(`/categories-revenu-fournisseur/${id}`).then((res) => {
      const data = res.data;
      console.log(data);
      // setCategoriesRevenuFournisseurSelectionnes(data);
      // Ajouter les IdCategoriesFournisseurs des CategoriesRevenuFournisseurSelectionnes à l'array idCategoriesFournisseurSelectionnes
      const selectedIds = data.map(
        (categorie) => categorie.idCategorieFournisseur
      );
      setIdCategoriesFournisseurSelectionnes(selectedIds);
    });
  }, []);

  const handleChange = (categorieId, isChecked) => {
    if (isChecked) {
      setIdCategoriesFournisseurSelectionnes((prevSelections) => [
        ...prevSelections,
        categorieId,
      ]);
    } else {
      setIdCategoriesFournisseurSelectionnes((prevSelections) =>
        prevSelections.filter((id) => id !== categorieId)
      );
    }
    idCategoriesFournisseurSelectionnes.map((id) => console.log(id));
  };
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nomCategorie, possedeFournisseurRevenu, image } = values;

    if (!image || !nomCategorie.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("nomCategorie", nomCategorie);
      formdata.append("possedeFournisseurRevenu", possedeFournisseurRevenu);
      // Convertir l'array en chaîne JSON
      const idCategoriesJSON = JSON.stringify(
        idCategoriesFournisseurSelectionnes
      );
      formdata.append("idCategoriesFournisseurSelected", idCategoriesJSON);
      await axiosPrivate.put(`/categories-revenus/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Modification réussie");
      setValues({
        nomCategorie: "",
        possedeFournisseurRevenu: false,
        image: null,
      });

      setErrorMessage("");
      navigate("/categorie-revenu");
    } catch (error) {
      console.error("Erreur lors de la modification de la catégorie", error);
      setErrorMessage(
        "Une erreur s'est produite lors de la modification de la catégorie. Veuillez réessayer."
      );
    }
  };
  console.log(values);

  const togglePossede = () => {
    setPossedeFournisseurRevenu((prev) => !prev);
  };
  const getImageSrc = (imageData, mimetype) => {
    const base64Prefix = `data:${mimetype};base64,`;
    return base64Prefix + imageData;
  };

  useEffect(() => {
    // Vérifier si au moins une case à cocher est cochée
    const anyCheckboxChecked = idCategoriesFournisseurSelectionnes.length > 0;

    // Mettre à jour possedeFournisseurRevenu en fonction de la sélection des cases à cocher
    setValues((prevValues) => ({
      ...prevValues,
      possedeFournisseurRevenu: anyCheckboxChecked,
    }));
  }, [idCategoriesFournisseurSelectionnes]);

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
          <h1>Modification du catégorie</h1>
          <form encType="multipart/form-data" className="d-grid gap-2">
            <div className="mb-3">
              <label htmlFor="nomCategorie" className="form-label">
                Nom de la catégorie
              </label>
              <input
                type="text"
                className="form-control"
                id="nomCategorie"
                required
                value={values.nomCategorie}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    nomCategorie: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              {/* Conditional rendering for the image */}
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
                checked={values.possedeFournisseurRevenu}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    possedeFournisseurRevenu: e.target.checked,
                  }))
                }
              />
              <label
                className="form-check-label"
                htmlFor="possedeFournisseurRevenu"
              >
                Possède fournisseur revenu
              </label>
            </div>
            {values.possedeFournisseurRevenu && (
              <div className="mb-3 form-check">
                <label
                  className="form-label"
                  htmlFor="possedeFournisseurRevenu"
                >
                  Choisir les catégories de fournisseurs
                </label>
                {categoriesFournisseur.map((categorie, index) => (
                  <div className="mb-3 form-check" key={index}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={categorie.IdCategorieFournisseur}
                      checked={idCategoriesFournisseurSelectionnes.includes(
                        categorie.IdCategorieFournisseur
                      )}
                      onChange={(e) =>
                        handleChange(
                          categorie.IdCategorieFournisseur,
                          e.target.checked
                        )
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="possedeFournisseurRevenu"
                    >
                      {categorie.nomCategorie}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-success"
            >
              Modifier
            </button>
            <br />
          </form>
        </div>
      </>
    </section>
  );
};

export default EditCategorieRevenu;
