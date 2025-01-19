import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaArrowLeft } from "react-icons/fa";

export const AddFournisseur = () => {
  const { auth } = useAuth();
  const [nom, setNom] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [categorieParenteId, setCategorieParenteId] = useState("");
  const [categoriesFournisseurs, setCategoriesFournisseurs] = useState([]);
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    // Charger les catégories de dépenses depuis l'API
    axiosPrivate
      .get("/categories-fournisseurs")
      .then((response) => {
        setCategoriesFournisseurs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories de fournisseurs:", error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !nom.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    const formdata = new FormData();
    formdata.append("logo", file);
    formdata.append("nom", nom);
    formdata.append("mail", mail);
    formdata.append("phone", phone);
    formdata.append("idCategorieFournisseur", categorieParenteId);

    try {
      const response = await axiosPrivate.post("/fournisseurs", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      console.log("succeeded");
      setCategorieParenteId("");
      setNom("");
      setMail("");
      setPhone("");
      setErrorMessage("");
      navigate("/fournisseur");
    } catch (error) {
      console.error("Error adding fournisseur", error);
      setErrorMessage(
        "Une erreur s'est produite lors de l'ajout du fournisseur. Veuillez réessayer."
      );
    }
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
                placeholder="Entrer nom"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div>
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
                placeholder="Entrer mail"
                required
                value={mail}
                onChange={(e) => setMail(e.target.value)}
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
                placeholder="Entrer téléphone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

export default AddFournisseur;
