import axios from "axios";

export function getUnidades() {
  return axios.get('https://localhost:7295/api/unidades');
}

export function getUnidad(id) {
  return axios.get(`https://localhost:7295/api/unidades/${id}`);
}

export function agregar(unidadRequest) {

  axios.post(`https://localhost:7295/api/unidaddes`, {...unidadRequest, id:null});
}

export function borrar(id) {
  axios.delete(`https://localhost:7295/api/unidades/${id}`);
}

export function modificar(unidad) {
  console.log(unidad);
  axios.put(`https://localhost:7295/api/unidades/`,unidad);
}
