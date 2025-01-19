import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const RevoquerAcces = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleRevoquerAcces = async () => {
    try {
      const response = await axios.put(`API/revoquer-user/${userId}`);
      // Gérer la réponse du serveur, afficher un message de succès, etc.
      console.log(response.data); // Afficher la réponse du serveur dans la console
    } catch (error) {
      console.error("Error revoking access:", error);
      // Gérer les erreurs, afficher un message d'erreur, etc.
    }
  };

  return (
    <section className="reset-password-container">
      <>
        <Button variant="danger" onClick={() => setShowModal(true)}>
          Révoquer Accès
        </Button>
        <Link
              to="/users"
              className="btn btn-secondary mb-3 text-start"
            
            >
              <FaArrowLeft style={{ marginRight: "5px" }} />
            </Link>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
          
            <Modal.Title>Confirmer la révocation d'accès</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Êtes-vous sûr de vouloir révoquer l'accès de cet utilisateur ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button variant="danger" onClick={handleRevoquerAcces}>
              Révoquer
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </section>
  );
};

export default RevoquerAcces;
