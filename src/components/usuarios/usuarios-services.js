import axios from "axios";

export function getUsuarios() {
    return axios.get('https://localhost:7295/api/users');
}

export function getUsuario(id) {
    return axios.get(`https://localhost:7295/api/users/${id}`);
}

export function agregar(usuarioRequest) {

    axios.post(`https://localhost:7295/api/users`, { ...usuarioRequest, id: null });
}

export function borrar(id) {
    axios.delete(`https://localhost:7295/api/users/${id}`);
}

export function modificar(usuario) {
    console.log(usuario);
    axios.put(`https://localhost:7295/api/users/`, usuario);
}

export function iniciarSesion(credentials) {
    return axios.post('https://localhost:7295/api/users/login', credentials);
}