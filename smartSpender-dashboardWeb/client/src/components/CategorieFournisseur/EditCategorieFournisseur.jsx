import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "react-bootstrap"; // Ajoutez cette ligne d'importation
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { FaArrowLeft } from "react-icons/fa";

const EditCategorieFournisseur = () => {
  const axiosPrivate = useAxiosPrivate();
  const [values, setValues] = useState({
    nomCategorie: "",
    image: null,
  });

  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [imageHidden, setImageHidden] = useState(false); // State to manage whether the image should be hidden or not

  useEffect(() => {
    axiosPrivate
      .get(`/categories-fournisseurs/${id}`)
      .then((res) => {
        const data = res.data;
        setValues({
          ...values,
          nomCategorie: data.nomCategorie,
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nomCategorie, image } = values;

    if (!image || !nomCategorie.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("nomCategorie", nomCategorie);

      await axiosPrivate.put(`/categories-fournisseurs/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Modification réussie");
      setValues({
        nomCategorie: "",
        image: null,
      });

      setErrorMessage("");
      navigate("/categorie-fournisseur");
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

export default EditCategorieFournisseur;
