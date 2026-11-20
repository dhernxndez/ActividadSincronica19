import { Link } from 'react-router';

export default function ProductCard({ product }) {
  return (
    <article className="tarjeta-producto">
      <Link to={`/productos/${product.id}`} className="tarjeta-producto__imagen">
        <img src={product.thumbnail} alt={product.title} loading="lazy" crossOrigin="anonymous" />
      </Link>
      <div className="tarjeta-producto__cuerpo">
        <span className="etiqueta">{product.category}</span>
        <h3>
          <Link to={`/productos/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="tarjeta-producto__precio">{product.price.toFixed(2)} €</p>
        <p className="tarjeta-producto__meta">
          ★ {product.rating.toFixed(1)} · {product.stock} disponibles
        </p>
      </div>
    </article>
  );
}
