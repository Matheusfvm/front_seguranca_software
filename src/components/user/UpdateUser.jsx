import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../api/userService";
import { useNavigate } from "react-router-dom";


const UpdateUser = () => {
  const { token, idUsuario } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    dataNascimento: "",
  });

  const navigate = useNavigate();

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userService.getUserById(idUsuario, token);
        setUserDetails(response);
        setFormData({
          nome: response.nome,
          email: response.email,
          senha: '',
          cpf: response.cpf,
          dataNascimento: response.dataNascimento,
        });
      } catch (error) {
        alert("Erro ao buscar os detalhes do usuário: " + error.message);
      }
    };

    if (idUsuario && token) {
      fetchUserDetails();
    }
  }, [idUsuario, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha ? formData.senha : userDetails.senha,
        cpf: formData.cpf,
        dataNascimento: formData.dataNascimento
      };
      await userService.updateUser(idUsuario, updatedData, token);
      alert("Usuário atualizado com sucesso");
      navigate("/user-details");
    } catch (error) {
      alert("Erro ao atualizar usuário: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Atualizar Usuário</h1>
      <input
        type="text"
        placeholder={userDetails ? userDetails.nome : "Nome"}
        name="nome"
        value={formData.nome}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder={userDetails ? userDetails.email : "Email"}
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Nova senha"
        name="senha"
        value={formData.senha}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder={userDetails ? userDetails.cpf : "CPF"}
        disabled
      />
      <input
        type="text"
        placeholder={userDetails ? formatDate(userDetails.dataNascimento) : "Data de Nascimento"}
        disabled
      />
      <button className="update">Atualizar</button>
      <button className="delete" onClick={() => navigate("/user-details")}>Cancelar</button>
    </form>
  );
};

export default UpdateUser;
