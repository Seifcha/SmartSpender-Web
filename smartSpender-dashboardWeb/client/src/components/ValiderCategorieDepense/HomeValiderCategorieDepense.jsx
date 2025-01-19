import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { DeleteCategorieDepense } from "./DeleteCategorieDepense";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "react-bootstrap";
import Menu from "../Menu";
// import "./CategorieDepense.css";

export default function HomeValiderCategorieDepense() {
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState([]);
  // const [idsCategoriesDepense, setIdsCategoriesDepense] = useState([]);
  const [categoriesFournisseurAssociees, setCategoriesFournisseurAssociees] =
    useState({});

  useEffect(() => {
    const shouldRefresh = localStorage.getItem("shouldRefreshHome");
    if (shouldRefresh === "true") {
      localStorage.removeItem("shouldRefreshHome");
      window.location.reload();
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get(
        "/suggestions-categories-depenses"
      );
      const fetchedCategories = response.data;
      setCategories(fetchedCategories);
      const categoryIds = fetchedCategories.map(
        (category) => category.IdCategorie
      );
      // setIdsCategoriesDepense(categoryIds);
      // Pour chaque ID de catégorie, récupérer les catégories fournisseurs associées
      const categoriesFournisseurs = {};
      await Promise.all(
        categoryIds.map(async (categoryId) => {
          const response = await axiosPrivate.get(
            `/categories-fournisseur-depense/${categoryId}`
          );
          categoriesFournisseurs[categoryId] = response.data;
        })
      );
      setCategoriesFournisseurAssociees(categoriesFournisseurs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleValider = async (id) => {
    try {
      await axiosPrivate.put(
        `/suggestions-categories-depenses/${id}`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Mettre à jour l'état ou effectuer d'autres actions après la validation réussie si nécessaire
      // setCategories(categories.filter((category) => category.IdCategorie !== idCategorie));
    } catch (error) {
      console.error("Error validating category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/suggestions-categories-depenses/${id}`);
      setCategories(
        categories.filter((category) => category.IdCategorie !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const getImageSrc = (imageData, mimetype) => {
    const base64Prefix = `data:${mimetype};base64,`;
    return base64Prefix + imageData;
  };

  const getCategoriesFournisseursAssociees = (categoryId) => {
    // Si l'objet `categoriesFournisseurAssociees` contient des données pour cette catégorie, les renvoyer
    if (categoriesFournisseurAssociees.hasOwnProperty(categoryId)) {
      return categoriesFournisseurAssociees[categoryId]
        .map((categorieFournisseur) => categorieFournisseur.nomCategorie)
        .join(", ");
    }
    // Sinon, retourner une chaîne vide
    return "";
  };

  return (
    <>
      <Container fluid>
        <div className="your-component-wrapper">
          {" "}
          {/* Classe pour isoler le CSS */}
          <div className="wrapper d-flex">
            {/* Incluez le composant Menu */}
            {/* Contenu principal */}
            <div id="table-button">
              <div class="table-responsive small">
                <div className="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <Menu />
                  <h1 className="h2">Validation des categories de dépense</h1>
                </div>
                {/* <div id="contentt"> */}
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-4 mx-auto"
                >
                  <Container fluid>
                    <div id="contentt" class="table-responsive small">
                      {/* Classe pour isoler le CSS */}
                      <Table
                        striped
                        bordered
                        hover
                        class="table table-striped table-sm"
                      >
                        <thead>
                          <tr>
                            <th>Email de l'utilisateur</th>
                            <th>Nom de Catégorie</th>
                            <th>Créé le</th>
                            <th>Modifié le</th>
                            <th>Image</th>
                            <th>Possède Fournisseur Dépense</th>
                            <th>Catégories fournisseurs associées</th>
                            <th style={{ width: "100px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <tr key={category.IdCategorie}>
                                <td>{category.userEmail}</td>
                                <td>{category.nomCategorie}</td>
                                <td>{category.createdAt}</td>
                                <td>{category.updatedAt}</td>
                                <td>
                                  <img
                                    alt="Embedded image"
                                    src={getImageSrc(
                                      category.image,
                                      category.mimetype
                                    )}
                                    style={{
                                      maxWidth: "100px",
                                      maxHeight: "100px",
                                    }}
                                  />
                                </td>
                                <td>
                                  {category.possedeFournisseurDepenseInt
                                    ? "Oui"
                                    : "Non"}
                                </td>
                                <td>
                                  {getCategoriesFournisseursAssociees(
                                    category.IdCategorie
                                  )}
                                </td>
                                <td>
                                  <Button
                                    id={category.IdCategorie}
                                    onClick={() =>
                                      handleValider(category.IdCategorie)
                                    }
                                  >
                                    Valider
                                  </Button>
                                  <Link
                                    to={`/edit-categorie-depense/${category.IdCategorie}`}
                                  >
                                    <Button className="btn btn-secondary">
                                      Modifier et Valider
                                    </Button>
                                  </Link>
                                  &nbsp;
                                  <DeleteCategorieDepense
                                    id={category.IdCategorie}
                                    onDelete={handleDelete}
                                  />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr style={{ border: "none" }}>
                              <td colSpan="9">Pas de données à afficher</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Container>
                </main>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
