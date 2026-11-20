const API_BASE = 'https://dummyjson.com';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);

  if (!response.ok) {
    let message = `Error HTTP ${response.status}`;
    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      // La respuesta de error no contiene JSON.
    }
    throw new Error(message);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export function getProducts({ query = '', category = '', limit = 12, signal } = {}) {
  const params = new URLSearchParams({ limit: String(limit) });

  let path = '/products';
  if (query) {
    path = '/products/search';
    params.set('q', query);
  } else if (category) {
    path = `/products/category/${encodeURIComponent(category)}`;
  }

  return request(`${path}?${params.toString()}`, { signal });
}

export function getProduct(id, signal) {
  return request(`/products/${id}`, { signal });
}

export function getCategories(signal) {
  return request('/products/category-list', { signal });
}

export function createCart(productId, quantity = 1) {
  return request('/carts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      products: [{ id: productId, quantity }]
    })
  });
}

export function updateCart(cartId, products) {
  return request(`/carts/${cartId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products })
  });
}

export function deleteCart(cartId) {
  return request(`/carts/${cartId}`, { method: 'DELETE' });
}
