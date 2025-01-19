import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css"; // Importation des styles CSS

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false); // Nouvel état pour vérifier si l'utilisateur a touché le champ de mot de passe
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;

  // Regex pour valider le mot de passe
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérification si les mots de passe correspondent
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      const response = await axios.post(
        `http://:9000/reset-password/${id}/${token}`,
        { password }
      );
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la soumission des données :", error);
      setErrorMessage(
        "Une erreur s'est produite lors de la soumission des données."
      );
    }
  };

  // Fonction pour valider le mot de passe avec regex
  const validatePassword = (value) => {
    return PASSWORD_REGEX.test(value);
  };

  // Gérer les changements dans le champ de mot de passe
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Vérifier si le mot de passe est valide avec regex
    setPasswordValid(validatePassword(newPassword));
    // Marquer le champ de mot de passe comme touché
    setPasswordTouched(true);
  };

  return (
    <section className="reset-password-container">
      <h3>Réinitialiser votre mot de passe</h3>
      <br />
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            type="password"
            placeholder="Entrer mot de passe"
            autoComplete="off"
            value={password}
            name="password"
            className="form-control"
            onChange={handlePasswordChange}
          />
          {passwordTouched && !passwordValid && (
            <div className="error-message">
              Le mot de passe doit comporter entre 8 et 24 caractères et inclure
              au moins une lettre majuscule, une lettre minuscule, un chiffre et
              un caractère spécial parmi !, @, #, $, %.
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            autoComplete="off"
            value={confirmPassword}
            name="confirmPassword"
            className="form-control"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              // Réinitialisation de l'erreur de correspondance des mots de passe
              setPasswordMatchError(false);
            }}
          />
          {passwordMatchError && (
            <div className="error-message">
              Les mots de passe ne correspondent pas.
            </div>
          )}
        </div>
        <div className="error-message">{errorMessage}</div>
        <button type="submit" className="btn-primary" disabled={!passwordValid}>
          Modifier
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
