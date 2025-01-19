import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { DeleteSousCategorieDepense } from "./DeleteSousCategorieDepense";
import { BsArrowLeft } from "react-icons/bs";
import {
  BiMoney,
  BiUser,
  BiBarChartAlt,
  BiMaleFemale,
  BiDotsHorizontal,
} from "react-icons/bi"; // Import des icônes financières
import { TbCategoryMinus } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Menu from "../Menu"; // Assurez-vous de spécifier le bon chemin d'accès
import { Container } from "react-bootstrap";
import "./SousCategorieDepense.css";
export default function HomeSousCategorieDepense() {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState({});

  useEffect(() => {
    const shouldRefresh = localStorage.getItem("shouldRefreshHome");
    if (shouldRefresh === "true") {
      localStorage.removeItem("shouldRefreshHome");
      window.location.reload();
    } else {
      fetchData();
      fetchDataParent();
    }
  }, []);

  const fetchDataParent = async () => {
    try {
      const response = await axiosPrivate.get("/categories-depenses");
      const categoriesMap = {};
      response.data.forEach((category) => {
        categoriesMap[category.IdCategorie] = category;
      });
      setParentCategories(categoriesMap);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/sousCategoriesDepense");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/sousCategoriesDepense/${id}`);
      setCategories(
        categories.filter((category) => category.IdSousCategorie !== id)
      );
    } catch (error) {
      console.error("Error deleting sous category:", error);
    }
  };

  const getParentCategoryName = (categoryId) => {
    return parentCategories[categoryId]
      ? parentCategories[categoryId].nomCategorie
      : "Aucune";
  };
  const getImageSrc = (imageData, mimetype) => {
    const base64Prefix = `data:${mimetype};base64,`;
    return base64Prefix + imageData;
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
                  <h1 className="h2">Gestion des sous catégories de dépense</h1>
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
                            <th>ID</th>
                            <th>Nom de sous catégorie</th>
                            <th>Créé le</th>
                            <th>Modifié le</th>
                            <th>Image</th>
                            <th>Categorie parente</th>
                            <th style={{ width: "100px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <tr key={category.IdSousCategorie}>
                                <td>{category.IdSousCategorie}</td>
                                <td>{category.nomSousCategorie}</td>
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
                                  {getParentCategoryName(
                                    category.idCategorieDepense
                                  )}
                                </td>
                                <td>
                                  <Link
                                    to={`/edit-sousCategorieDepense/${category.IdSousCategorie}`}
                                  >
                                    <Button>Modifier</Button>
                                  </Link>
                                  &nbsp;
                                  <DeleteSousCategorieDepense
                                    id={category.IdSousCategorie}
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

                      <br />
                    </div>
                  </Container>
                </main>
              </div>
              <div
                id="ajouter"
                className="col-md-9 ml-sm-auto col-lg-10 px-4 mx-auto "
              >
                <Link to="/create-sousCategorieDepense">
                  <Button style={{ marginLeft: "-30px", marginRight: "-30px" }}>
                    Ajouter une sous catégorie
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
