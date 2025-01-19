import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import DeleteFournisseur from "./DeleteFournisseur";
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
import { Container } from "react-bootstrap";
import Menu from "../Menu"; // Assurez-vous de spécifier le bon chemin d'accès
import "./Fournisseur.css";

export default function HomeFournisseur() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [fournisseurs, setFournisseurs] = useState([]);
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

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/fournisseurs");
      setFournisseurs(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/fournisseurs/${id}`);
      setFournisseurs(
        fournisseurs.filter((fournisseur) => fournisseur.IdFournisseur !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
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
                  <h1 className="h2">Gestion des fournisseurs</h1>
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
                            <th>Nom</th>
                            <th>Créé le</th>
                            <th>Modifié le</th>
                            <th>Logo</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Catégorie fournisseur</th>
                            <th style={{ width: "100px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fournisseurs.length > 0 ? (
                            fournisseurs.map((fournisseur) => (
                              <tr key={fournisseur.IdFournisseur}>
                                <td>{fournisseur.IdFournisseur}</td>
                                <td>{fournisseur.nom}</td>
                                <td>{fournisseur.createdAt}</td>
                                <td>{fournisseur.updatedAt}</td>
                                <td>
                                  <img
                                    alt="Embedded image"
                                    src={getImageSrc(
                                      fournisseur.logo,
                                      fournisseur.mimetype
                                    )}
                                    style={{
                                      maxWidth: "100px",
                                      maxHeight: "100px",
                                    }}
                                  />
                                </td>
                                <td>{fournisseur.mail}</td>
                                <td>{fournisseur.phone}</td>
                                <td>
                                  {getParentCategoryName(
                                    fournisseur.idCategorieFournisseur
                                  )}
                                </td>
                                <td>
                                  <Link
                                    to={`/edit-fournisseur/${fournisseur.IdFournisseur}`}
                                  >
                                    <Button>Modifier</Button>
                                  </Link>
                                  &nbsp;
                                  <DeleteFournisseur
                                    id={fournisseur.IdFournisseur}
                                    onDelete={handleDelete}
                                  />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr style={{ border: "none" }}>
                              <td colSpan="10">Pas de données à afficher</td>
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
                <Link to="/create-Fournisseur">
                  <Button>Ajouter un fournisseur</Button>
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
