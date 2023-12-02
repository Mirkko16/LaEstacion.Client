import axios from "axios";

export function getVentas() {
  return axios.get('https://localhost:7295/api/ventas');
}

export function getVenta(id) {
  return axios.get(`https://localhost:7295/api/ventas/${id}`);
}

export function agregar(ventaRequest) {
  axios.post(`https://localhost:7295/api/ventas`, {...ventaRequest, id:null});
}

