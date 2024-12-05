import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../api/userService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email_user, setEmail] = useState("");
  const [senha_user, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login({ email_user, senha_user });
      login(response.token, response.id);
      navigate("/user-details");
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email_user}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <input
          type="password"
          placeholder="Senha"
          value={senha_user}
          onChange={(e) => setSenha(e.target.value)}
          required />
        <div className="button-container">
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate("/register")}>Cadastrar</button>
        </div>
      </form>
    </>
  );
};

export default Login;
