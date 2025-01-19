import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import {
  BiMoney,
  BiUser,
  BiBarChartAlt,
  BiMaleFemale,
  BiDotsHorizontal,
} from "react-icons/bi"; // Import des icônes financières
import { DeleteCategorieFournisseur } from "./DeleteCategorieFournisseur";

import { TbCategoryMinus } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import { Container } from "react-bootstrap";
import Menu from "../Menu"; // Assurez-vous de spécifier le bon chemin d'accès
import "./CategorieFournisseur.css";
export default function HomeCategorieFournisseur() {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);

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
      const response = await axiosPrivate.get("/categories-Fournisseurs");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getImageSrc = (imageData, mimetype) => {
    const base64Prefix = `data:${mimetype};base64,`;
    return base64Prefix + imageData;
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/categories-fournisseurs/${id}`);
      setCategories(
        categories.filter(
          (fournisseur) => fournisseur.IdCategorieFournisseur !== id
        )
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
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
                  <h1 className="h2">Gestion de categories de fournisseurs</h1>
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
                            <th>Nom de Catégorie</th>
                            <th>Créé le</th>
                            <th>Modifié le</th>

                            <th>Image</th>
                            <th style={{ width: "100px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <tr key={category.IdCategorieFournisseur}>
                                <td>{category.IdCategorieFournisseur}</td>
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
                                  <Link
                                    to={`/edit-categorie-Fournisseur/${category.IdCategorieFournisseur}`}
                                  >
                                    <Button>Modifier</Button>
                                  </Link>
                                  <Link
                                    to={`/send-notif/${category.IdCategorieFournisseur}`}
                                  >
                                    <Button className="btn btn-secondary">
                                      Envoyer Notification
                                    </Button>
                                  </Link>
                                  &nbsp;
                                  <DeleteCategorieFournisseur
                                    id={category.IdCategorieFournisseur}
                                    onDelete={handleDelete}
                                  />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8">Pas de données à afficher</td>
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
                <Link
                  className="d-grid gap-2"
                  to="/create-categorie-Fournisseur"
                >
                  <Button>Ajouter une catégorie </Button>
                  <br />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
