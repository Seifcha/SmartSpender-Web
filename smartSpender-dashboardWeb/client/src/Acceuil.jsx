import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi"; // Importez l'icône de menu

import {
  BiMoney,
  BiUser,
  BiBarChartAlt,
  BiMaleFemale,
  BiDotsHorizontal,
  BiLogOutCircle,
} from "react-icons/bi"; // Import des icônes financières
import { TbCategoryMinus } from "react-icons/tb";
import "./Acceuil.css"; // Assurez-vous d'importer le fichier CSS pour les styles
import { useNavigate } from "react-router-dom";
import useLogout from "./hooks/useLogout";
import AuthContext from "./context/AuthProvider"; // Import the AuthContext
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import Menu from "./components/Menu";
const Accueil = () => {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useContext(AuthContext); // Access the user data from the AuthContext
  const navigate = useNavigate();
  const logout = useLogout();
  const [sidebarOpen, setSidebarOpen] = useState(true); // État pour contrôler l'affichage du sidebar

  // Fonction pour basculer l'état du sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  const [image, setImage] = useState(null);
  useEffect(() => {
    const shouldRefresh = localStorage.getItem("shouldRefreshHome");
    if (shouldRefresh === "true") {
      localStorage.removeItem("shouldRefreshHome");
      window.location.reload();
    } else {
      axiosPrivate
        .get(`/register/${username}`)
        .then((res) => {
          const image = res.data;
          setImage(image);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  let username;

  // Vérifier si le username est présent dans le localStorage
  if (localStorage.getItem("username")) {
    username = localStorage.getItem("username");
  } else {
    // Si le username n'est pas présent dans le localStorage, récupérez-le à partir d'une autre source
    // Par exemple, d'une variable globale ou d'une autre source de données
    username = localStorage.getItem("long_duration_username");
  }
  const getImageSrc = (imageData, mimetype) => {
    const base64Prefix = `data:${mimetype};base64,`;
    return base64Prefix + imageData;
  };
  return (
    <div className="wrapper">
      {/* Contenu principal */}
      <div id="content">
        <Menu />
        <main
          role="main"
          className="col-md-9 ml-sm-auto col-lg-10 px-4 d-flex flex-column align-items-center"
        >
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            {/* Affichage de l'image et du message de bienvenue */}
            <div className="d-flex align-items-center">
              <div
                className="avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "10px",
                }}
              >
                <Link to="/#">
                  <img
                    alt="Avatar"
                    src={image && getImageSrc(image, image.mimetype)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </div>
              <h1 className="h2">Bienvenue, {username} !</h1>
            </div>{" "}
            <div className="welcome-msg">
              {/* Display the welcome message with the username */}
              {/* <p>Bienvenue, {auth.user}</p> */}
            </div>
          </div>
          {/* Votre contenu principal ici */}
          <img
            src="\SmartSpenderOK-Photoroom.png-Photoroom.png"
            style={{ width: "100%", maxWidth: "600px", marginRight: "-70px" }}
          />
        </main>
      </div>
    </div>
  );
};

export default Accueil;
