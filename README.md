# Omnidex - Frontend

Frontend web dell'applicazione **Omnidex**. 

Il backend di riferimento è disponibile qui: [omnidex-backend](https://github.com/bingiulioliu/omnidex-backend).

## Architettura

L'app è strutturata secondo un pattern component-based:

- **`src/main.jsx`** - Entry point, monta l'app con i provider
- **`src/App.jsx`** - Configurazione delle rotte
- **`src/layouts/`** - Layout condivisi (es. `MainLayout`)
- **`src/pages/`** - Pagine principali dell'applicazione
- **`src/components/`** - Componenti riutilizzabili UI
- **`src/contexts/`** - Context API per lo stato globale (es. `ThemeContext`)
- **`src/hooks/`** - Custom hooks
- **`src/utils/`** - Funzioni di utilità e fetch
- **`src/styles/`** - Stili globali
- **`src/assets/`** - Asset statici
