import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home.jsx'
import About from './components/about.jsx'
import Opciones from './components/opciones.jsx'
import AbmProductos from './components/productos/productos-abm.jsx'
// import AbmMotos from './components/motos/motos-abm.jsx'
// import AbmBicicletas from './components/bicicletas/bicicletas-abm.jsx'
import { FormProducto } from './components/productos/productos-form.jsx'
// import { FormBicicleta } from './components/bicicletas/bicicletas-form.jsx'
// import { FormMoto } from './components/motos/motos-form.jsx'

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
          {/* <Route path='motos' element={<AbmMotos />} />
          <Route path='motos/agregar' element={<FormMoto />} />
          <Route path='motos/:id' element={<FormMoto />} />
          {/* Formularios y abm Proveedores */}
          {/* <Route path='bicicletas' element={<AbmBicicletas />} />
          <Route path='bicicletas/agregar' element={<FormBicicleta />} />
          <Route path='bicicletas/:id' element={<FormBicicleta />} />  */}
        </Route>
        <Route path='opciones' element={<Opciones />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
