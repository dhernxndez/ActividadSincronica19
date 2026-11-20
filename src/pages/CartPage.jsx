import { Link } from 'react-router';
import { useCart } from '../context/CartContext.jsx';

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    increment,
    decrement,
    removeItem,
    clearCart
  } = useCart();

  if (items.length === 0) {
    return (
      <section className="estado estado--vacio">
        <h1>El carrito está vacío</h1>
        <p>Los productos añadidos se guardan en localStorage.</p>
        <Link className="boton boton--primario" to="/productos">
          Ver productos
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="titulo-seccion">
        <div>
          <p className="sobrelinea">Compra</p>
          <h1>Carrito</h1>
        </div>
        <button type="button" className="boton boton--texto" onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>

      <ul className="carrito">
        {items.map((item) => (
          <li key={item.id} className="carrito__item">
            <img src={item.thumbnail} alt={item.title} crossOrigin="anonymous" />
            <div className="carrito__info">
              <Link to={`/productos/${item.id}`}>{item.title}</Link>
              <p>{item.price.toFixed(2)} € por unidad</p>
            </div>
            <div className="cantidad" aria-label={`Cantidad de ${item.title}`}>
              <button type="button" onClick={() => decrement(item.id)}>
                −
              </button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => increment(item.id)}>
                +
              </button>
            </div>
            <strong>{(item.price * item.quantity).toFixed(2)} €</strong>
            <button
              type="button"
              className="boton boton--texto"
              onClick={() => removeItem(item.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="resumen-compra">
        <p>
          {totalItems} unidades · <strong>{totalPrice.toFixed(2)} €</strong>
        </p>
        <button type="button" className="boton boton--primario">
          Finalizar compra
        </button>
        <small>
          La compra es simulada: DummyJSON no persiste el carrito en un servidor.
        </small>
      </div>
    </section>
  );
}
