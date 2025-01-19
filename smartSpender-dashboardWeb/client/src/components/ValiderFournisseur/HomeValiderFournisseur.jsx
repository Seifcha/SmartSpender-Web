import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteCategorieRevenu } from "../CategorieRevenu/DeleteCategorieRevenu";
import { BsArrowLeft } from "react-icons/bs";
import {
  BiMoney,
  BiUser,
  BiBarChartAlt,
  BiMaleFemale,
  BiDotsHorizontal,
} from "react-icons/bi"; // Import des icônes financières
import { TbCategoryMinus } from "react-icons/tb";
import useAuth from "../../hooks/useAuth"; // Importez le hook useAuth
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "react-bootstrap";
import Menu from "../Menu"; // Assurez-vous de spécifier le bon chemin d'accès
import { DeleteFournisseur } from "./DeleteFournisseur";

export default function HomeValiderFournisseur() {
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState([]);
  // const [idsCategoriesDepense, setIdsCategoriesDepense] = useState([]);

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
  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/suggestions-fournisseurs");
      const fetchedCategories = response.data;
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [parentCategories, setParentCategories] = useState({});

  const fetchDataParent = async () => {
    try {
      const response = await axiosPrivate.get("/categories-fournisseurs");
      const categoriesMap = {};
      response.data.forEach((category) => {
        categoriesMap[category.IdCategorieFournisseur] = category;
      });
      setParentCategories(categoriesMap);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    }
  };

  const getParentCategoryName = (categoryId) => {
    return parentCategories[categoryId]
      ? parentCategories[categoryId].nomCategorie
      : "Aucune";
  };
  const handleValider = async (id) => {
    try {
      await axiosPrivate.put(
        `/suggestions-fournisseurs/${id}`,

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
      await axiosPrivate.delete(`/suggestions-fournisseurs/${id}`);
      setCategories(
        categories.filter((category) => category.IdFournisseur !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
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
                  <h1 className="h2">Validation des fournisseurs</h1>
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
                            <th>Nom du fournisseur</th>
                            <th>Créé le</th>
                            <th>Modifié le</th>
                            <th>Logo</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Catégorie du fournisseur</th>

                            <th style={{ width: "100px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <tr key={category.IdFournisseur}>
                                <td>{category.userEmail}</td>
                                <td>{category.nom}</td>
                                <td>{category.createdAt}</td>
                                <td>{category.updatedAt}</td>
                                <td>
                                  <img
                                    alt="Embedded image"
                                    src={getImageSrc(
                                      category.logo,
                                      category.mimetype
                                    )}
                                    style={{
                                      maxWidth: "100px",
                                      maxHeight: "100px",
                                    }}
                                  />
                                </td>
                                <td>{category.mail}</td>
                                <td>{category.phone}</td>
                                <td>
                                  {getParentCategoryName(
                                    category.idCategorieFournisseur
                                  )}
                                </td>
                                <td>
                                  <Button
                                    id={category.IdFournisseur}
                                    onClick={() =>
                                      handleValider(category.IdFournisseur)
                                    }
                                  >
                                    Valider
                                  </Button>
                                  <Link
                                    to={`/edit-fournisseur/${category.IdFournisseur}`}
                                  >
                                    <Button className="btn btn-secondary">
                                      Modifier et Valider
                                    </Button>
                                  </Link>
                                  &nbsp;
                                  <DeleteFournisseur
                                    id={category.IdFournisseur}
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
