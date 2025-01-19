import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import usersData from "./Users.json";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const EnvoyerCodeReinitialisation = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const { auth } = useAuth();

  const [values, setValues] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    genre: "",
    adresse: "",
    domaineTravail: "",
    posteTravail: "",
    phone: "",
    email: "",
    photoProfil: null,
  });
  const dateFormat = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };
  console.log(id);
  useEffect(() => {
    axiosPrivate
      .get(`/user/${id}`)
      .then((res) => {
        const data = res.data;
        setValues({
          ...values,
          nom: data.nom,
          prenom: data.prenom,
          dateNaissance: data.dateNaissance,
          genre: data.genre,
          adresse: data.adresse,
          domaineTravail: data.domaineTravail,
          posteTravail: data.posteTravail,
          phone: data.phone,
          email: data.email,
          photoProfil: data.photoProfil,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const getImageSrc = (imageData, mimetype) => {
    const base64Prefix = `data:${mimetype};base64,`;
    return base64Prefix + imageData;
  };
  return (
    <section className="reset-password-container">
      <>
        <div className="modal-content">
          <div className="modal-header">
            <Link to="/users" className="btn btn-secondary">
              <FaArrowLeft style={{ marginRight: "5px" }} />
            </Link>
          </div>
          <img
            src={getImageSrc(values.photoProfil, values.mimetype)}
            alt="smartspender Logo"
            style={{
              display: "block", // Assure que l'image est affichée comme un bloc
              margin: "auto", // Centre l'image horizontalement
              width: "50%",
              borderRadius: "50%",
            }}
          />

          <h5 className="modal-title">
            {values.nom} {values.prenom}
          </h5>
          <div className="modal-body">
            <p>
              <strong>Email:</strong>
              {values.email}
            </p>
            <p>
              <strong>Téléphone:</strong> {values.phone}
            </p>

            <p>
              <strong>Adresse:</strong> {values.adresse}
            </p>

            <p>
              <strong>Date de Naissance:</strong>
              {dateFormat(values.dateNaissance)}
            </p>
            <p>
              <strong>Genre:</strong> {values.genre}
            </p>
            <p>
              <strong>Domaine de travail:</strong> {values.domaineTravail}
            </p>
            <p>
              <strong>Poste de travail:</strong> {values.posteTravail}
            </p>
            {/* Ajoutez d'autres détails selon les besoins */}
          </div>
        </div>
      </>
    </section>
  );
};

export default EnvoyerCodeReinitialisation;
