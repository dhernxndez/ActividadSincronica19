import { useEffect, useState } from 'react';
import { getProduct, getProducts } from '../api/products.js';

export function useProducts({ query = '', category = '' } = {}) {
  const [state, setState] = useState({
    status: 'loading',
    products: [],
    total: 0,
    error: null
  });

  useEffect(() => {
    const controller = new AbortController();

    setState((current) => ({
      ...current,
      status: 'loading',
      error: null
    }));

    getProducts({ query, category, signal: controller.signal })
      .then((data) => {
        setState({
          status: 'success',
          products: data.products,
          total: data.total,
          error: null
        });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({
          status: 'error',
          products: [],
          total: 0,
          error: error.message
        });
      });

    return () => controller.abort();
  }, [query, category]);

  return state;
}

export function useProduct(id) {
  const [state, setState] = useState({
    status: 'loading',
    product: null,
    error: null
  });

  useEffect(() => {
    if (!id) return undefined;
    const controller = new AbortController();

    setState({ status: 'loading', product: null, error: null });

    getProduct(id, controller.signal)
      .then((product) => {
        setState({ status: 'success', product, error: null });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ status: 'error', product: null, error: error.message });
      });

    return () => controller.abort();
  }, [id]);

  return state;
}
