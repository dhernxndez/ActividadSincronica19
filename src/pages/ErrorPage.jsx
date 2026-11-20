import { Link, useRouteError } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  const message = error?.statusText || error?.message || 'Error inesperado';

  return (
    <section className="estado estado--error">
      <p className="sobrelinea">Error de ruta</p>
      <h1>No se pudo mostrar esta página</h1>
      <p>{message}</p>
      <Link className="boton boton--primario" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
