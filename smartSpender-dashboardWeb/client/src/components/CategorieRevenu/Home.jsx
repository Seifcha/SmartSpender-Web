import React, { useState, useEffect } from "react";
import { Button, Table, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { DeleteCategorieRevenu } from "./DeleteCategorieRevenu";

import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "react-bootstrap";
import Menu from "../Menu"; // Assurez-vous de spécifier le bon chemin d'accès

export default function HomeCategorieRevenu() {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
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
      const response = await axiosPrivate.get("/categories-revenus");
      const fetchedCategories = response.data;
      setCategories(fetchedCategories);
      const categoryIds = fetchedCategories.map(
        (category) => category.IdCategorie
      );
      const categoriesFournisseurs = {};
      await Promise.all(
        categoryIds.map(async (categoryId) => {
          const response = await axiosPrivate.get(
            `/categories-fournisseur-revenu/${categoryId}`
          );
          categoriesFournisseurs[categoryId] = response.data;
        })
      );
      setCategoriesFournisseurAssociees(categoriesFournisseurs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/categories-revenus/${id}`);
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
                  <h1 className="h2">Gestion de categories de revenus</h1>
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
                        <thead style={{ marginRight: "-165px" }}>
                          <tr>
                            <th>ID</th>
                            <th>Nom de Catégorie</th>
                            <th>Créé le</th>
                            <th>Modifié le</th>

                            <th>Image</th>
                            <th>Possède Fournisseur Revenu</th>
                            <th>Catégories fournisseurs associées</th>
                            <th style={{ width: "100px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <tr key={category.IdCategorie}>
                                <td>{category.IdCategorie}</td>
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
                                  {category.possedeFournisseurRevenuInt
                                    ? "Oui"
                                    : "Non"}
                                </td>
                                <td>
                                  {getCategoriesFournisseursAssociees(
                                    category.IdCategorie
                                  )}
                                </td>
                                <td>
                                  <Link
                                    to={`/edit-categorie-revenu/${category.IdCategorie}`}
                                  >
                                    <Button>Modifier</Button>
                                  </Link>
                                  &nbsp;
                                  <DeleteCategorieRevenu
                                    id={category.IdCategorie}
                                    onDelete={handleDelete}
                                  />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="11">Pas de données à afficher</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Container>
                </main>
              </div>
              <div
                id="ajouter"
                className="col-md-9 ml-sm-auto col-lg-10 px-4 mx-auto "
              >
                <Link className="d-grid gap-2" to="/create-categorie-revenu">
                  <Button>Ajouter une catégorie </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
