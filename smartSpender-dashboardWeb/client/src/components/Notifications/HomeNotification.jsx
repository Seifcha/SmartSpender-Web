import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "react-bootstrap";
import Menu from "../Menu";

export default function HomeNotifications() {
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState([]);
  // const [idsCategoriesDepense, setIdsCategoriesDepense] = useState([]);

  useEffect(() => {
    const shouldRefresh = localStorage.getItem("shouldRefreshHome");
    if (shouldRefresh === "true") {
      localStorage.removeItem("shouldRefreshHome");
      window.location.reload();
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/notifications");
      setCategories(response.data);
      console.log(response.data);
      // setIdsCategoriesDepense(categoryIds);
      // Pour chaque ID de catégorie, récupérer les catégories fournisseurs associées
    } catch (error) {
      console.error("Error fetching data:", error);
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
          <div className="wrapper d-flex">
            <div id="table-button">
              <div class="table-responsive small">
                <div className="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <Menu />
                  <h1 className="h2">Notifications</h1>
                </div>
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-4 mx-auto"
                >
                  <Container fluid>
                    <div id="contentt" class="table-responsive small">
                      <Table
                        striped
                        bordered
                        hover
                        class="table table-striped table-sm"
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Envoyée le</th>
                            <th>Contenu</th>
                            <th>Logo</th>
                            <th>Fournisseur</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <tr key={category.idNotification}>
                                <td>{category.idNotification}</td>
                                <td>{category.title}</td>
                                <td>{category.createdAt}</td>
                                <td>{category.image}</td>
                                <td>{category.nomFournissuer}</td>

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
              <div
                id="ajouter"
                className="col-md-9 ml-sm-auto col-lg-10 px-4 mx-auto "
              >
                <Link to="/send-notif">
                  <Button>Envoyer une notification</Button>
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
