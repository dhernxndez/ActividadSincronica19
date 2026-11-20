import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section className="estado estado--vacio">
      <p className="sobrelinea">Error 404</p>
      <h1>Esta página no existe</h1>
      <p>La ruta solicitada no forma parte del catálogo.</p>
      <Link className="boton boton--primario" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
