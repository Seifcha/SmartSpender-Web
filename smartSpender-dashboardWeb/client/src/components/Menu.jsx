// import React from "react";
// import { Link } from "react-router-dom";
// import { BiMenu } from "react-icons/bi"; // Importez l'icône de menu
// import {
//   BiLogOutCircle,
//   BiHome,
//   BiMoney,
//   BiUser,
//   BiBarChartAlt,
//   BiMaleFemale,
//   BiDotsHorizontal,
// } from "react-icons/bi"; // Import des icônes financières
// import { TbCategoryMinus } from "react-icons/tb";
// import useLogout from "../hooks/useLogout";
// import "./Menu.css";

// const Menu = () => {
// const logout = useLogout();

// const signOut = async () => {
//   await logout();
//   navigate("/login");
// };
//   return (
//     <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
//       <div
//         className="offcanvas-md offcanvas-end bg-body-tertiary"
//         tabIndex="-1"
//         id="sidebarMenu"
//         aria-labelledby="sidebarMenuLabel"
//       >
//         <div className="offcanvas-header">
//           <h5 class="offcanvas-title" id="sidebarMenuLabel">
//             SmartSpender
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             data-bs-target="#sidebarMenu"
//             aria-label="Close"
//           ></button>
//         </div>
// <ul className="list-unstyled components">
//   <li>
//     <Link to="/">
//       <BiHome />
//       <span>Accueil</span>
//     </Link>
//   </li>
//   <li className="active">
//     <Link to="/categorie-depense">
//       <BiMoney />
//       <span>Gérer les catégories dépenses</span>
//     </Link>
//   </li>
//   <li>
//     <Link to="/sousCategorieDepense">
//       <BiDotsHorizontal />
//       <span>Gérer les sous-catégories dépenses</span>
//     </Link>
//   </li>
//   <li>
//     <Link to="/categorie-revenu">
//       <BiBarChartAlt />
//       <span>Gérer les catégories revenus</span>
//     </Link>
//   </li>

//   <li>
//     <Link to="/fournisseur">
//       <BiMaleFemale />
//       <span>Gérer les fournisseurs</span>
//     </Link>
//   </li>
//   <li>
//     <Link to="/categorie-fournisseur">
//       <TbCategoryMinus />
//       <span>Gérer les catégories fournisseurs</span>
//     </Link>
//   </li>
//   <li>
//     <Link to="/users">
//       <BiUser />
//       <span>Gérer les utilisateurs</span>
//     </Link>
//   </li>
//   <li className="logout">
//     <Link onClick={signOut} className="logout ">
//       <BiLogOutCircle />
//       <span> Déconnexion</span>
//     </Link>
//   </li>
// </ul>
//       </div>
//     </div>
//   );
// };

// export default Menu;
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import "./Menu.css";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { Link } from "react-router-dom";
import { MdNotificationAdd } from "react-icons/md";

import { IoPersonAddOutline } from "react-icons/io5"; // Importez l'icône de menu
import {
  BiLogOutCircle,
  BiUserPlus,
  BiHome,
  BiMoney,
  BiUser,
  BiBarChartAlt,
  BiMaleFemale,
  BiDotsHorizontal,
  BiCheckCircle,
} from "react-icons/bi"; // Import des icônes financières
import { TbCategoryMinus } from "react-icons/tb";
import useLogout from "../hooks/useLogout";
import "./Menu.css";
const Menu = () => {
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}

        <ul className="list-unstyled components">
          <li>
            <Link to="/">
              <BiHome />
              <span>Accueil</span>
            </Link>
          </li>
          <li className="active">
            <Link to="/categorie-depense">
              <BiMoney />
              <span>Gérer les catégories dépenses</span>
            </Link>
          </li>
          <li>
            <Link to="/sousCategorieDepense">
              <BiDotsHorizontal />
              <span>Gérer les sous-catégories dépenses</span>
            </Link>
          </li>
          <li>
            <Link to="/categorie-revenu">
              <BiBarChartAlt />
              <span>Gérer les catégories revenus</span>
            </Link>
          </li>

          <li>
            <Link to="/fournisseur">
              <BiMaleFemale />
              <span>Gérer les fournisseurs</span>
            </Link>
          </li>
          <li>
            <Link to="/categorie-fournisseur">
              <TbCategoryMinus />
              <span>Gérer les catégories fournisseurs</span>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <BiUser />
              <span>Gérer les utilisateurs</span>
            </Link>
          </li>
          <li>
            {"­ ­  "}
            <BiCheckCircle />
            <span>Validation :</span>

            <ul className="submenu">
              <li>
                <Link to="/valider-categories-depense">
                  <span>Catégories dépense</span>
                </Link>
              </li>
              <li>
                <Link to="/valider-sous-categorie">
                  <span>Sous-catégories</span>
                </Link>
              </li>{" "}
              <li>
                <Link to="/valider-categories-revenu">
                  <span>Catégories revenu</span>
                </Link>
              </li>
              <li>
                <Link to="/valider-fournisseurs">
                  <span>Fournisseurs</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/notifications">
              <MdNotificationAdd />
              {"­­  "}
              <span>Envoyer notifications</span>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <IoPersonAddOutline />
              {"­­  "}
              <span>Ajouter un nouveau administrateur</span>
            </Link>
          </li>
          <li className="logout">
            <Link onClick={signOut} className="logout ">
              <BiLogOutCircle />
              <span> Déconnexion</span>
            </Link>
          </li>
        </ul>
      </List>
    </Box>
  );

  return (
    <div className="Navbar">
      {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))} */}

      <MenuIcon onClick={toggleDrawer("left", true)} />

      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

export default Menu;
