# Dalla cartella vuota allo scaffolding

Step per passare da cartella vuota a progetto pronto per scrivere codice.
Stack allineato a questo progetto: Vite + React 19 + React Router 7 + Bootstrap + ESLint.

---

## Step 1 — Crea il progetto con Vite

Dalla cartella vuota (o dal suo interno):

```bash
npm create vite@latest . -- --template react
```

- Il `.` dice "crea qui dentro" (se la cartella non è vuota, Vite chiede conferma).
- `--template react` = JavaScript + JSX. (`react-ts` sarebbe TypeScript).

## Step 2 — Installa le dipendenze base

```bash
npm install
```

## Step 3 — Installa le librerie del progetto

```bash
npm install react-router react-router-dom bootstrap bootstrap-icons react-icons react-markdown remark-gfm
```

| Libreria | A cosa serve |
|---|---|
| `react-router-dom` | Routing (`<Routes>`, `<Route>`, `<Link>`, `useNavigate`) |
| `bootstrap` + `bootstrap-icons` | CSS e icone |
| `react-icons` | Icone come componenti React |
| `react-markdown` + `remark-gfm` | Render di markdown (es. descrizioni prodotto) |

Dev deps già presenti dal template: `vite`, `@vitejs/plugin-react`, `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.

## Step 4 — Crea la struttura delle cartelle

```bash
mkdir -p src/components src/pages src/layouts src/contexts src/hooks src/utils
```

```
src/
├── main.jsx        # entry point
├── App.jsx         # provider + rotte
├── components/     # riusabili (Header, Footer, ProductCard...)
├── pages/          # una per rotta (HomePage, ProductsList...)
├── layouts/        # layout con <Outlet />
├── contexts/       # Context API (CartContext, ThemeContext...)
├── hooks/          # hook custom (useCart, useTheme...)
└── utils/          # fetch API e helper puri
```

## Step 5 — Pulisci il template

Rimuovi il codice demo di Vite:

```bash
rm src/App.css src/assets/react.svg public/vite.svg
```

- `src/index.css`: **tienilo** come foglio di stile base (body, font, variabili) oppure eliminalo e metti il CSS base in un file per componente.
- `src/App.jsx`: svuotalo, ci scriveremo dentro allo step 7.

## Step 6 — Configura `main.jsx`

```jsx
// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

## Step 7 — Configura `App.jsx` (provider + rotte)

Scheletro minimo — i Provider si annidano, le rotte stanno dentro:

```jsx
// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            {/* <ThemeProvider>
            <CartProvider> */}

            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>

            {/* </CartProvider>
            </ThemeProvider> */}
        </BrowserRouter>
    );
}

export default App;
```

E il layout minimo con le Outlet:

```jsx
// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            {/* <Header /> */}
            <main>
                <Outlet />   {/* qui le pagine della rotta attiva */}
            </main>
            {/* <Footer /> */}
        </>
    );
}
```

Pagine vuote di partenza:

```jsx
// src/pages/HomePage.jsx
export default function HomePage() {
    return <h1>Home</h1>;
}
```

## Step 8 — Variabili d'ambiente per l'API

```bash
printf 'VITE_API_URL=http://localhost:3000\n' > .env
```

Regole Vite:

- Solo le variabili con prefisso `VITE_` sono esposte al codice frontend.
- Si leggono con `import.meta.env.VITE_API_URL`.
- **Mai** mettere secret veri qui: qualsiasi cosa finisce nel bundle pubblico.
- Aggiungi `.env` a `.gitignore` se contiene dati sensibili (i default locali di solito si committano).

Uso nelle util di fetch:

```jsx
// src/utils/api.js
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
```

> Alternative: un proxy in `vite.config.js` (`server.proxy`) per evitare CORS in sviluppo — da configurare solo se il backend lo richiede.

## Step 9 — Inizializza git

Vite non fa `git init`:

```bash
git init
```

Il `.gitignore` del template esclude già `node_modules`, `dist`, ecc. Verifica con `git status`.

## Step 10 — Verifica che tutto giri

```bash
npm run dev     # → http://localhost:5173, deve aprire la HomePage
npm run lint    # → nessun errore
```

---

## Checklist "pronto a scrivere"

- [ ] `npm run dev` apre senza errori
- [ ] Cartelle `components/ pages/ layouts/ contexts/ hooks/ utils/` create
- [ ] `main.jsx` importa Bootstrap e il CSS base
- [ ] `App.jsx` ha BrowserRouter + Routes + almeno una rotta
- [ ] `MainLayout` con `<Outlet />`
- [ ] `.env` con `VITE_API_URL` letto da `src/utils/`
- [ ] `npm run lint` pulito
- [ ] `git init` fatto

Da qui in poi il flusso di scrittura è: **fetch in `utils/` → stato/effetti nella pagina → Context per lo stato globale → componenti presentazionali in `components/`**.
