import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const userService = {
  // Criar um novo usuário
  register: (data) =>
    axios.post(`${API_BASE_URL}/usuarios/`, data).then((res) => res.data),

  // Login do usuário
  login: (data) =>
    axios.post(`${API_BASE_URL}/login/`, data).then((res) => res.data),

  // Buscar usuário por ID
  getUserById: (id, token) =>
    axios
      .get(`${API_BASE_URL}/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),

  // Atualizar usuário
  updateUser: (id, data, token) =>
    axios
      .put(`${API_BASE_URL}/usuarios/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),

  // Deletar usuário permanentemente
  deleteUserPermanent: (id, token) =>
    axios.delete(`${API_BASE_URL}/usuarios/deletar-permanente/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default userService;
