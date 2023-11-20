import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home.jsx'
import About from './components/about.jsx'
import Opciones from './components/opciones.jsx'
import AbmProductos from './components/productos/productos-abm.jsx'
import AbmClientes from './components/clientes/clientes-abm.jsx'
import { FormProducto } from './components/productos/productos-form.jsx'
import { FormCliente } from './components/clientes/clientes-form.jsx'
import AbmProveedores from './components/proveedores/proveedores-abm.jsx'
import { FormProveedor } from './components/proveedores/proveedores-form.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='datos'>
          {/* Formularios y abm productos */}
          <Route path='productos' element={<AbmProductos />} />
          <Route path='productos/agregar' element={<FormProducto />} />
          <Route path='productos/:id' element={<FormProducto />} />
          
          {/* Formularios y abm Clientes */}
          <Route path='clientes' element={<AbmClientes />} />
          <Route path='clientes/agregar' element={<FormCliente />} />
          <Route path='clientes/:id' element={<FormCliente />} />
          {/* Formularios y abm Proveedores */}
           <Route path='proveedores' element={<AbmProveedores />} />
          <Route path='proveedores/agregar' element={<FormProveedor />} />
          <Route path='proveedores/:id' element={<FormProveedor />} /> 
        </Route>
        <Route path='opciones' element={<Opciones />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
