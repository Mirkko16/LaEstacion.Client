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
import AbmMarcas from './components/marcas/marcas-abm.jsx'
import { FormMarca } from './components/marcas/marcas-form.jsx'
import AbmFamilias from './components/familias/familias-abm.jsx'
import { FormFamilia } from './components/familias/familias-form.jsx'
import AbmRubros from './components/rubros/rubros-abm.jsx'
import { FormRubro } from './components/rubros/rubros-form.jsx'
import AbmUnidades from './components/unidades/unidades-abm.jsx'
import { FormUnidad } from './components/unidades/unidades-form.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path='/'>
          {/* Formularios y abm productos */}
          <Route path='productos/listado' element={<AbmProductos />} />
          <Route path='productos/agregar' element={<FormProducto />} />
          <Route path='productos/listado/:id' element={<FormProducto />} />
        </Route>
        <Route path='Productos'>
          {/* Formularios y abm Marcas */}
          <Route path='marcas' element={<AbmMarcas />} />
          <Route path='marcas/agregar' element={<FormMarca />} />
          <Route path='marcas/:id' element={<FormMarca />} />
        </Route>
        <Route path='Productos'>
          {/* Formularios y abm productos */}
          <Route path='familias' element={<AbmFamilias />} />
          <Route path='familias/agregar' element={<FormFamilia />} />
          <Route path='familias/:id' element={<FormFamilia />} />
        </Route>

        <Route path='Productos'>
          {/* Formularios y abm productos */}
          <Route path='rubros' element={<AbmRubros />} />
          <Route path='rubros/agregar' element={<FormRubro />} />
          <Route path='rubros/:id' element={<FormRubro />} />
        </Route>

        <Route path='Productos'>
          {/* Formularios y abm productos */}
          <Route path='stock' element={<AbmRubros />} />
          <Route path='stock/agregar' element={<FormRubro />} />
          <Route path='stock/:id' element={<FormRubro />} />
        </Route>

        <Route path='Productos'>
          {/* Formularios y abm productos */}
          <Route path='unidades' element={<AbmUnidades/>} />
          <Route path='unidades/agregar' element={<FormUnidad />} />
          <Route path='unidades/:id' element={<FormUnidad />} />
        </Route>
        
        <Route path='/'>
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
