// Import des modules nécessaires
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vérifier si l'e-mail existe dans la base de données
      const emailExistsResponse = await axios.post(
        "http://:9000/check-email-exists",
        { email }
      );

      if (!emailExistsResponse.data.exists) {
        setErrorMessage("Adresse e-mail introuvable.");
        return;
      }

      // Si l'e-mail existe, envoyer la demande de réinitialisation du mot de passe
      const forgotPasswordResponse = await axios.post(
        "http://:9000/forgot-password",
        { email },
        { withCredentials: true }
      );

      if (forgotPasswordResponse.data.Status === "Success") {
        setEmailSent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="reset-password-container">
      <h4>Mot de passe oublié</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Envoyer
        </Button>
      </Form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {emailSent && <p>Un e-mail a été envoyé.</p>}
    </section>
  );
};

export default ForgotPassword;
