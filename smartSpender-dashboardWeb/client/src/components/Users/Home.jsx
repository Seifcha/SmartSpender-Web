import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { DeleteUser } from "./DeleteUser";
import { BsArrowLeft } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";

import userData from "./Users.json"; // Importer le fichier JSON
import {
  BiMoney,
  BiUser,
  BiBarChartAlt,
  BiMaleFemale,
  BiDotsHorizontal,
} from "react-icons/bi"; // Import des icônes financières
import { TbCategoryMinus } from "react-icons/tb";
import { Container } from "react-bootstrap";
import Menu from "../Menu"; // Assurez-vous de spécifier le bon chemin d'accès
import "./Users.css";
export default function HomeUser() {
  const dateFormat = (date) => {
    moment.locale();
    return moment(date).format("YYYY/MM/DD, h:mm");
  };
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
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
      const response = await axiosPrivate.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(users);
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
                  <h1 className="h2">Gestion des utilisateurs</h1>
                </div>
                {/* <div id="contentt"> */}
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-4 mx-auto"
                >
                  <Container fluid>
                    <div class="table-responsive small">
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
                            <th>Nom </th>
                            <th>Prénom </th>
                            <th>Créé le</th>
                            <th>Modifié le</th>

                            <th>Accès révoqué</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th style={{ width: "150px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.length > 0 ? (
                            users.map((user) => (
                              <tr key={user.IdUser}>
                                <td>{user.IdUser}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{dateFormat(user.createdAt)}</td>
                                <td>{dateFormat(user.updatedAt)}</td>

                                <td>{user.isActive ? "Non" : "Oui"}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td className="d-flex">
                                  <div className="button-container">
                                    <Link to={`/envoyer-code/${user.IdUser}`}>
                                      <Button>Consulter fiche</Button>
                                    </Link>
                                    &nbsp;
                                    <DeleteUser id={user.IdUser} />
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="12">Pas de données à afficher</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Container>
                </main>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </Container>
    </>
  );
}
