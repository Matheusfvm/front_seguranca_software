import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../api/userService";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { token, idUsuario, logout } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userService.getUserById(idUsuario, token);
        setUserDetails(response);
      } catch (error) {
        alert("Erro ao buscar os detalhes do usuário: " + error.message);
      }
    };

    if (idUsuario && token) {
      fetchUserDetails();
    }
  }, [idUsuario, token]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar permanentemente seu perfil?");
    if(confirmDelete) {
      try {
        await userService.deleteUserPermanent(idUsuario, token); // Exclusão permanente
        alert("Usuário deletado permanentemente com sucesso!");
        logout();
        navigate("/login");
      } catch (error) {
      const errorMessage =
        error.response?.data?.mensagem || "Erro ao deletar usuário.";
      alert(errorMessage); // Exibe o erro retornado pelo back-end
      }
    };
  };

  const navigate = useNavigate();

  return (
    <div className="user-details-container">
      <h1>Detalhes do Usuário</h1>
      {userDetails ? (
        <div className="details-card">
          <div className="detail">
            <label>Nome:</label>
            <span>{userDetails.nome}</span>
          </div>
          <div className="detail">
            <label>Email:</label>
            <span>{userDetails.email}</span>
          </div>
          <div className="detail">
            <label>CPF:</label>
            <span>{userDetails.cpf}</span>
          </div>
          <div className="detail">
            <label>Data de Nascimento:</label>
            <span>{formatDate(userDetails.dataNascimento)}</span>
          </div>
          <div className="buttons-container">
            <button className="update" onClick={() => navigate("/update-user")}>
              Atualizar
            </button>
            <button className="delete" onClick={handleDelete}>Deletar</button>
            <button className="logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default UserDetails;