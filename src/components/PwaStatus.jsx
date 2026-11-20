import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

export default function PwaStatus() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [updateSW, setUpdateSW] = useState(null);

  useEffect(() => {
    const update = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        setOfflineReady(true);
      },
      onRegisterError(error) {
        console.error('No se pudo registrar el service worker', error);
      }
    });

    setUpdateSW(() => update);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {isOffline && (
        <div className="aviso aviso--offline" role="status">
          Sin conexión. Se muestran los datos disponibles en caché.
        </div>
      )}

      {offlineReady && (
        <div className="aviso aviso--ok" role="status">
          Aplicación lista para funcionar sin conexión.
          <button type="button" onClick={() => setOfflineReady(false)}>
            Cerrar
          </button>
        </div>
      )}

      {needRefresh && (
        <div className="aviso aviso--update" role="status">
          Hay una versión nueva disponible.
          <button
            type="button"
            onClick={() => {
              updateSW?.(true);
              setNeedRefresh(false);
            }}
          >
            Actualizar
          </button>
          <button type="button" onClick={() => setNeedRefresh(false)}>
            Después
          </button>
        </div>
      )}
    </>
  );
}
