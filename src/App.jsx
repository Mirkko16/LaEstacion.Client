import { Outlet, NavLink, Link } from "react-router-dom"


function App() {

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid align-items-center p-4">
          <NavLink to="/" className="navbar-brand">Home</NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Administracion
                </a>
                <ul className="dropdown-menu">
                  <li><NavLink to="/usuarios" className="nav-link">Usuarios</NavLink></li>
                  <li><NavLink to="/productos/marcas" className="nav-link">Marcas</NavLink></li>
                  <li><NavLink to="/productos/familias" className="nav-link">Familias</NavLink></li>
                  <li><NavLink to="/productos/rubros" className="nav-link">Rubros</NavLink></li>
                  <li><NavLink to="/productos/stock" className="nav-link">Stock</NavLink></li>
                  <li><NavLink to="/productos/unidades" className="nav-link">Unidades</NavLink></li>
                </ul>
              </li>


              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Clientes
                </a>
                <ul className="dropdown-menu">
                  <li><NavLink to="/clientes" className="nav-link">Listado Clientes</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Proveedores
                </a>
                <ul className="dropdown-menu">
                  <li><NavLink to="/proveedores" className="nav-link">Proveedores</NavLink></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Productos
                </a>
                <ul className="dropdown-menu">
                  <li><NavLink to="/productos/listado" className="nav-link">Listado</NavLink></li>

                </ul>
              </li>

              <hr />
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Ventas
                </a>
                <ul className="dropdown-menu">
                  <li><NavLink to="/ventas" className="nav-link">Listado</NavLink></li>
                  <li><NavLink to="/ventas/venta" className="nav-link">Ventas</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

      <footer className="fixed-bottom w-100 mt-5 p-3 bg-light">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="fs-5">La EstacionWeb</Link>
          <div className="fs-5">Mirko-Kauffman 2023</div>
        </div>
      </footer>
    </>
  )
}

export default App
