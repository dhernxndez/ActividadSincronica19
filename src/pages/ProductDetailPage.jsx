import { Link, useParams } from 'react-router';
import { useCart } from '../context/CartContext.jsx';
import { useProduct } from '../hooks/useProducts.js';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { status, product, error } = useProduct(id);
  const { addItem } = useCart();

  if (status === 'loading') {
    return <p className="estado estado--cargando">Cargando producto...</p>;
  }

  if (status === 'error') {
    return (
      <div className="estado estado--error" role="alert">
        <strong>No se pudo cargar el producto.</strong>
        <p>{error}</p>
        <Link className="boton boton--secundario" to="/productos">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <section className="detalle">
      <Link className="volver" to="/productos">
        ← Volver al catálogo
      </Link>

      <div className="detalle__contenido">
        <div className="detalle__imagen">
          <img src={product.thumbnail} alt={product.title} crossOrigin="anonymous" />
        </div>
        <div className="detalle__datos">
          <span className="etiqueta">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detalle__marca">{product.brand || 'Marca no disponible'}</p>
          <p className="detalle__precio">{product.price.toFixed(2)} €</p>
          <p>{product.description}</p>
          <dl className="datos">
            <div>
              <dt>Valoración</dt>
              <dd>★ {product.rating.toFixed(1)}</dd>
            </div>
            <div>
              <dt>Stock</dt>
              <dd>{product.stock} unidades</dd>
            </div>
            <div>
              <dt>Descuento</dt>
              <dd>{product.discountPercentage}%</dd>
            </div>
          </dl>
          <button
            type="button"
            className="boton boton--primario"
            onClick={() => addItem(product)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  );
}
