import { useEffect, useState } from 'react';
import { getCategories } from '../api/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { useProducts } from '../hooks/useProducts.js';

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const { status, products, total, error } = useProducts({ query, category });

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal)
      .then(setCategories)
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') setCategories([]);
      });
    return () => controller.abort();
  }, []);

  return (
    <section>
      <div className="titulo-seccion">
        <div>
          <p className="sobrelinea">Catálogo</p>
          <h1>Productos</h1>
        </div>
        <p className="contador">{status === 'success' ? `${total} resultados` : ' '}</p>
      </div>

      <form className="filtros" onSubmit={(event) => event.preventDefault()}>
        <label>
          Buscar
          <input
            type="search"
            value={query}
            placeholder="Teléfono, portátil, perfume..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          Categoría
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Todas</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </form>

      {status === 'loading' && (
        <p className="estado estado--cargando" role="status">
          Cargando productos...
        </p>
      )}

      {status === 'error' && (
        <div className="estado estado--error" role="alert">
          <strong>No se pudieron cargar los productos.</strong>
          <p>{error}</p>
        </div>
      )}

      {status === 'success' && products.length === 0 && (
        <p className="estado estado--vacio">
          No hay productos que coincidan con la búsqueda.
        </p>
      )}

      {status === 'success' && products.length > 0 && (
        <div className="rejilla-productos">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
