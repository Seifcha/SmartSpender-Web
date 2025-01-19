import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const DeleteCategorieRevenu = ({ id, onDelete }) => {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`http://:9000/categories-revenus/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`, // Utilisez le jeton d'accès dans l'en-tête
        },
        withCredentials: true,
      });
      onDelete(id); // Appeler la fonction de mise à jour après la suppression réussie
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Supprimer
    </button>
  );
};
