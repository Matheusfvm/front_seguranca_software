import React, { useState } from "react";
import userService from "../../api/userService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    dataNascimento: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.register(formData);
      alert("Usuário registrado com sucesso!");
      navigate("/login");
    } catch (error) {
      alert("Erro ao registrar usuário: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <><form onSubmit={handleSubmit}>
      <h1>Registrar</h1>
      {Object.keys(formData).map((field) => (
        <div key={field}>
          <input
            type={field === "email"
              ? "email"
              : field === "senha"
                ? "password"
                : field === "dataNascimento"
                  ? "date"
                  : "text"}
            placeholder={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required />
        </div>
      ))}
      <div className="button-container">
        <button type="submit">Registrar</button>
        <button type="button" onClick={() => navigate("/login")}>Ir para Login</button>
      </div>
    </form>
    </>
  );
};

export default Register;
