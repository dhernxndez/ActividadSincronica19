import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!prompt) return null;

  return (
    <button
      type="button"
      className="boton boton--instalar"
      onClick={async () => {
        prompt.prompt();
        await prompt.userChoice;
        setPrompt(null);
      }}
    >
      Instalar aplicación
    </button>
  );
}
