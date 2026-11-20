import { NavLink, Outlet } from 'react-router';
import { useCart } from '../context/CartContext.jsx';
import InstallButton from '../components/InstallButton.jsx';
import PwaStatus from '../components/PwaStatus.jsx';

function navClass({ isActive }) {
  return isActive ? 'nav__enlace nav__enlace--activo' : 'nav__enlace';
}

export default function AppLayout() {
  const { totalItems } = useCart();

  return (
    <div className="app-shell">
      <PwaStatus />
      <header className="cabecera">
        <div className="contenedor cabecera__contenido">
          <NavLink to="/" className="marca">
            Catálogo<span>PWA</span>
          </NavLink>
          <nav className="nav" aria-label="Navegación principal">
            <NavLink to="/" end className={navClass}>
              Inicio
            </NavLink>
            <NavLink to="/productos" className={navClass}>
              Productos
            </NavLink>
            <NavLink to="/carrito" className={navClass}>
              Carrito ({totalItems})
            </NavLink>
            <InstallButton />
          </nav>
        </div>
      </header>

      <main className="contenedor contenido">
        <Outlet />
      </main>

      <footer className="pie">
        <div className="contenedor">
          Módulo 9 · PWA y consumo de APIs · Datos de DummyJSON
        </div>
      </footer>
    </div>
  );
}
