import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "react-bootstrap"; // Ajoutez cette ligne d'importation
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { FaArrowLeft } from "react-icons/fa";
import Buffer from "buffer";
const EditFournisseur = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [categoriesFournisseurs, setCategoriesFournisseurs] = useState([]);

  const [values, setValues] = useState({
    nomFournisseur: "",
    phone: "",
    email: "",
    logo: null,
    categorieParentId: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [imageHidden, setImageHidden] = useState(false); // State to manage whether the image should be hidden or not

  useEffect(() => {
    axiosPrivate
      .get(`/fournisseurs/${id}`)
      .then((res) => {
        const data = res.data;
        setValues({
          ...values,
          nomFournisseur: data.nom,
          phone: data.phone,
          email: data.mail,
          logo: data.logo,
          categorieParentId: data.idCategorieFournisseur,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues((prevValues) => ({
        ...prevValues,
        logo: file,
      }));
      // Hide the image when a new file is selected
      setImageHidden(true);
    }
  };
  useEffect(() => {
    // Charger les catégories de dépenses depuis l'API
    axiosPrivate
      .get(`/categories-fournisseurs/`)
      .then((response) => {
        console.log(response.data);
        setCategoriesFournisseurs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories parentes de dépenses:", error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nomFournisseur, phone, email, logo, categorieParentId } = values;
    if (!nomFournisseur.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }
    console.log(categorieParentId);
    try {
      const formdata = new FormData();
      formdata.append("logo", logo);
      formdata.append("nom", nomFournisseur);
      formdata.append("mail", email);
      formdata.append("phone", phone);
      formdata.append("idCategorieFournisseur", categorieParentId);

      await axiosPrivate.put(`/fournisseurs/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("succeeded");
      setValues({
        nomFournisseur: "",
        email: "",
        phone: "phone",
        logo: null,
        categorieParentId: 0,
      });

      setErrorMessage("");
      // Rediriger vers la page 'categorie-depense' après l'ajout réussi
      navigate("/fournisseur");
    } catch (error) {
      console.error("Error updating fournisseur", error);
      // Afficher un message d'erreur en cas d'échec de la requête
      setErrorMessage(
        "Une erreur s'est produite lors de la modification du fournisseur. Veuillez réessayer."
      );
    }
  };

  const getImageSrc = (imageData, mimetype) => {
    const base64Prefix = `data:${mimetype};base64,`;
    return base64Prefix + imageData;
  };
  return (
    <section className="reset-password-container">
      <>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <Link
            to="/fournisseur"
            className="btn btn-secondary mb-3 text-start"
            style={{ marginRight: "230px" }}
          >
            <FaArrowLeft style={{ marginRight: "5px" }} />
          </Link>
          <h1>Modification du fournisseur</h1>

          <form
            encType="multipart/form-data"
            action="upload"
            className="d-grid gap-2"
          >
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom du fournisseur
              </label>
              <input
                type="text"
                className="form-control"
                id="nom"
                placeholder="Enter nom"
                required
                value={values.nomFournisseur}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    nomFournisseur: e.target.value,
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
                    src={getImageSrc(values.logo, values.mimetype)}
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
              <label htmlFor="logo" className="form-label">
                logo
              </label>
              <input
                type="file"
                onChange={handleFile}
                className="form-control"
                id="image"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mail" className="form-label">
                Email
              </label>
              <input
                type="mail"
                className="form-control"
                id="mail"
                placeholder="Enter mail"
                required
                value={values.email}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                téléphone du fournisseur
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Enter phone"
                value={values.phone}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    phone: e.target.value,
                  }))
                }
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
                <option>Sélectionnez une catégorie parente</option>

                {categoriesFournisseurs.map((categorie) => (
                  <option
                    key={categorie.IdCategorieFournisseur}
                    value={categorie.IdCategorieFournisseur}
                  >
                    {categorie.nomCategorie}
                  </option>
                ))}
              </select>
            </div>
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

export default EditFournisseur;
