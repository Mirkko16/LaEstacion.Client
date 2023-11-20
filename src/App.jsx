import { Outlet, NavLink, Link } from "react-router-dom"


function App() {

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid align-items-center p-4">
          <NavLink to="/" className="navbar-brand">Home</NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink to="opciones" className="nav-link">Opciones</NavLink></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Datos
                </a>
                <ul className="dropdown-menu">
                  <li><NavLink to="datos/productos" className="nav-link">Productos</NavLink></li>
                  {/* <li><NavLink to="datos/motos" className="nav-link">Motos</NavLink></li>
                  <li><NavLink to="datos/bicicletas" className="nav-link">Bicicletas</NavLink></li> */}
                </ul>
              </li>
              
              <hr />
              <li className="nav-item"><NavLink to="about" className="nav-link">Acerca de...</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

      <footer className="fixed-bottom w-100 mt-5 p-3 bg-light">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="fs-5">La Estacion-Web</Link>
          <div className="fs-5">@Mirko-Kauffman 2023</div>
        </div>
      </footer>
    </>
  )
}

export default App
