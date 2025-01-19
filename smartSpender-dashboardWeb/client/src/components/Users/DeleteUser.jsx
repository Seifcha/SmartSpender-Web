import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

export const DeleteUser = ({ id, onDelete }) => {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  const handleDelete = async () => {
    try {
      await axiosPrivate.put(`/user/${id}`);
      onDelete(id); // Appeler la fonction de mise à jour après la suppression réussie
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  //
  return (
    <button onClick={handleDelete} className="btn btn-dark">
      Révoquer accès
    </button>
  );
};
