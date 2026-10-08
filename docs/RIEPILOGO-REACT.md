# Ripasso React — guida riassuntiva

Documento di ripasso basato sulle convenzioni di **questo** progetto (Vite + React 19 + React Router 7).

---

## 1. Avviare un progetto

### Creazione (una tantum)

```bash
# Progetto nuovo con Vite (modalità interattiva)
npm create vite@latest nome-progetto -- --template react

cd nome-progetto
npm install
```

### Avvio quotidiano

```bash
npm run dev      # server di sviluppo → http://localhost:5173
npm run build    # build di produzione in dist/
npm run preview  # prova la build di produzione in locale
npm run lint     # ESLint
```

### Struttura tipica (quella di questo progetto)

```
src/
├── main.jsx          # punto di ingresso: ReactDOM.createRoot(...).render()
├── App.jsx           # Provider + rotte
├── pages/            # pagine (route di React Router)
├── components/       # componenti riusabili
├── layouts/          # layout con <Outlet />
├── contexts/         # Context API (state globale)
├── hooks/            # hook personalizzati (useCart, useTheme...)
├── utils/            # funzioni pure: fetch API, helper
└── *.css             # CSS (uno per componente in questo progetto)
```

### Punto di ingresso

```jsx
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

> `StrictMode` in sviluppo esegue due volte gli effetti: serve a far notare bug (fetch duplicate, cleanup mancanti).

---

## 2. Componenti

Un componente è una **funzione che restituisce JSX** (HTML "dentro" JS).

```jsx
// Componente con export di default (import: import ProductCard from ...)
function ProductCard({ product }) {
    return (
        <div className="card">
            <h2>{product.name}</h2>
            <p>{product.price} €</p>
        </div>
    );
}

export default ProductCard;
```

Regole fondamentali:

- **PascalCase** per il nome (`ProductCard`, non `productCard`).
- L'elemento iniziale con `key` quando lo si genera in `.map()` (chiave unica, meglio un id/slug, **mai** l'indice se la lista può riordinarsi).
- Il JSX deve avere **un solo nodo radice** (o usare `<>...</>` frammento).
- Un componente non deve mutare le sue props: le tratta come **read-only**.
- I tag HTML auto-conclusivi in JSX: `<img />`, `<input />`, `<br />`.

### Stato locale di un componente

```jsx
function NewsletterBanner() {
    const [email, setEmail] = useState("");

    return (
        <input
            value={email}                          // input controllato
            onChange={(e) => setEmail(e.target.value)}
        />
    );
}
```

---

## 3. Props (proprietà)

Le props sono il modo per **passare dati dal genitore al figlio** — come attributi HTML.

```jsx
// Genitore
<ProductCard product={product} onAdd={handleAdd} />

// Figlio — destructuring dell'oggetto props
function ProductCard({ product, onAdd }) {
    return <button onClick={() => onAdd(product)}>Aggiungi</button>;
}
```

Cose da ricordare:

- **Solo verso il basso**: un figlio non può risalire al genitore via props (per quello servono Context o "lifting state up").
- `children` = tutto ciò che sta tra le tag del componente:

```jsx
function Card({ children }) {
    return <div className="card">{children}</div>;
}

<Card>
    <h1>Ciao</h1>   {/* questi diventano children */}
</Card>
```

- Un valore `false`/`null`/`undefined` nelle props condizionali non viene renderizzato:

```jsx
{isLoading && <p>Caricamento...</p>}
{user && <span>{user.name}</span>}
```

---

## 4. Stato: `useState`

```jsx
const [valore, setValore] = useState(valoreIniziale);
```

- Chiamare `setValore(x)` **non modifica la variabile subito**: schedula un re-render con il nuovo valore.
- Se il nuovo valore dipende da quello precedente, usa la **forma funzionale** (altrimenti rischi di perdere aggiornamenti):

```jsx
setCartItems((currentItems) => [...currentItems, newItem]);
setCurrentPage((currentValue) => currentValue - 1);
```

- Lo stato è **immutable**: array e oggetti vanno copiati con spread (`...`) e poi modificati, mai modificati in posto (`.push()`, `.sort()` diretto, ecc.).

```jsx
// ❌ sbagliato
items.sort((a, b) => a.price - b.price);

// ✅ giusto
setItems([...items].sort((a, b) => a.price - b.price));
```

- `useState` accetta anche una **funzione lazy** per calcolare lo stato iniziale solo al primo render (utile per leggere `localStorage`, vedi `CartContext.jsx:6`):

```jsx
const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
});
```

- Ogni hook va chiamato **sempre nello stesso ordine**, nel top-level del componente (mai dentro if/for/cicli).

---

## 5. Effetti: `useEffect`

```jsx
useEffect(() => {
    // codice da eseguire dopo il render
    return () => {
        // cleanup: eseguito prima del re-render successivo e allo smontaggio
    };
}, [dipendenze]);
```

Interpretazione delle dipendenze:

| Dipendenze | Quando gira |
|---|---|
| `[]` (array vuoto) | una sola volta, al mount |
| `[a, b]` | al mount e ogni volta che `a` o `b` cambiano |
| *omesso* | ad **ogni** render (quasi sempre un errore) |

Casi d'uso classici nel tuo progetto:

```jsx
// 1) Sincronizzare un effetto collaterale con lo stato (persistenza)
useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);   // CartContext.jsx:16

// 2) Chiamare la API quando cambiano i filtri
useEffect(() => {
    fetchProducts(filters)
        .then((data) => setProducts(data.results || []))
        .catch((err) => setErrorMessage("Errore..."))
        .finally(() => setIsLoading(false));
}, [searchTerm, category, currentPage /* ... */]);
```

**Cleanup obbligatorio** per timer/listener/fetch:

```jsx
useEffect(() => {
    const timer = setTimeout(() => { /* ... */ }, 500);
    return () => clearTimeout(timer);   // annulla il timer se i filtri cambiano
}, [searchTerm]);
```

Errori comuni:

- Ciclo infinito: chiamare `setState` dentro un `useEffect` **con la stessa variabile** nelle dipendenze.
- Dimenticare una dipendenza → effetto con dati obsoleti (il lint `react-hooks/exhaustive-deps` te lo segnala).
- React 19: se l'effetto restituisce una promise (async), usa `async` dentro una funzione separata o `.then()`.

---

## 6. Altri hook utili

### `useRef`

```jsx
const firstRender = useRef(true);   // valore persistente tra i render, NON causa re-render
```

- Non è stato: cambiarlo non ri-renderizza.
- Uso tipico: flag "primo render" (per il debounce in `ProductsList.jsx:64`), tenere traccia di un timer, accedere a un DOM node: `const inputRef = useRef(null)` → `<input ref={inputRef} />`.

### `useContext`

```jsx
const { cartItems, addToCart } = useContext(CartContext);
```

Legge il valore corrente del Context più vicino. È quello che fanno i tuoi hook custom (`useCart`).

### `useSearchParams` (React Router)

```jsx
const [searchParams, setSearchParams] = useSearchParams();
const search = searchParams.get("search") || "";
setSearchParams({ page: 2 }, { replace: true });
```

Legge/scrive i parametri della query string (`?search=potion&page=2`) — utile perché lo stato dei filtri sopravvive al refresh.

### Altri (meno usati qui)

- `useReducer` — stato complesso con azioni tipo Redux: `const [state, dispatch] = useReducer(reducer, statoIniziale)`.
- `useMemo(() => valore, [deps])` — memoizza un **valore calcolato** costoso.
- `useCallback(fn, [deps])` — memoizza una **funzione**, utile per non far ridichiarare callback passate a figli ottimizzati con `React.memo`.
- `useId` — id unici per label/aria, utile con form.

---

## 7. Hook personalizzati (custom hooks)

Una funzione che usa altri hook e che **inizia con `use`**. Serve a estrarre logica riusabile.

```jsx
// src/hooks/useCart.js
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export function useCart() {
    const ctx = useContext(CartContext);

    if (!ctx) {
        throw new Error("useCart deve essere usato dentro <CartProvider>");
    }

    return ctx;
}
```

Uso nei componenti:

```jsx
const { cartItems, addToCart, cartTotal } = useCart();
```

Un custom hook può anche contenere `useState`/`useEffect` propri — a quel punto ogni componente che lo chiama ha il **suo** stato indipendente.

---

## 8. Contesti (Context API)

Problema risolto: passare dati a componenti profondi senza trasmeterli via props ad ogni livello ("prop drilling").

### Definizione (3 passi)

```jsx
// src/contexts/CartContext.jsx
import { createContext, useEffect, useState } from "react";

// 1. Crea il contesto
const CartContext = createContext(null);

// 2. Il Provider: contiene lo stato e le funzioni, le espone in "value"
function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) { /* ... */ }

    const value = { cartItems, addToCart /* ... */ };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// 3. Esporta entrambi
export { CartContext, CartProvider };
```

### Collegamento nell'app

```jsx
// App.jsx — i Provider si annidano attorno alle rotte
<BrowserRouter>
  <ThemeProvider>
    <NewsletterProvider>
      <WishlistProvider>
        <CartProvider>
          <Routes>...</Routes>
        </CartProvider>
      </WishlistProvider>
    </NewsletterProvider>
  </ThemeProvider>
</BrowserRouter>
```

### Consumo

```jsx
const { cartItems, addToCart } = useContext(CartContext);
// oppure, con l'hook dedicato:
const { cartItems, addToCart } = useCart();
```

Note importanti:

- `value` è un oggetto **nuovo ad ogni render** del Provider → tutti i consumatori si ri-renderizzano quando cambia anche un pezzetto. Se diventa un problema, si usano più Context separati o `useReducer`.
- Il Context non fa magia con le mutazioni: lo stato si aggiorna sempre con `setState`.
- Alternativa moderna: React 19 ha `use()`, ma in questo progetto si usa il classico `createContext` + `useContext`.

---

## 9. Consumare le REST API del backend

### Il pattern: funzioni fetch separate in `src/utils/`

Non si chiama mai `fetch` direttamente nel componente: si crea una funzione dedicata.

```jsx
// src/utils/fetchProducts.js
const API_URL = "http://localhost:3000";

export async function fetchProducts(filters = {}) {
    const params = new URLSearchParams(filters);   // oggetto → "page=1&category=armi"

    const response = await fetch(`${API_URL}/products?${params.toString()}`);

    if (!response.ok) {                             // fetch NON lancia errore su 404/500!
        throw new Error("Errore durante il recupero dei prodotti");
    }

    return response.json();                         // restituisce la Promise del JSON
}
```

**Punto cruciale**: `fetch` rigetta la Promise solo se manca la rete. Un risposta HTTP 404 o 500 arriva comunque "ok" per fetch → va controllato `response.ok` e va lanciato un `throw`, altrimenti il `.then()` prosegue con dati di errore.

### Chiamata in un componente: `useEffect` + stati di caricamento/errore

```jsx
const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");

    fetchProducts(filters)
        .then((data) => {
            setProducts(data.results || []);
        })
        .catch((error) => {
            console.error(error);
            setErrorMessage("Errore durante il caricamento dei prodotti.");
        })
        .finally(() => {
            setIsLoading(false);        // eseguito sempre
        });
}, [filters]);                          // = dipendenze che scatenano la chiamata
```

Oppure in stile `async/await` (React 19 consiglia di non mettere `async` direttamente nel corpo dell'effetto):

```jsx
useEffect(() => {
    let cancelled = false;              // evita setState dopo lo smontaggio

    async function load() {
        try {
            const data = await fetchProducts(filters);
            if (!cancelled) setProducts(data.results || []);
        } catch (err) {
            if (!cancelled) setErrorMessage("Errore...");
        } finally {
            if (!cancelled) setIsLoading(false);
        }
    }

    load();
    return () => { cancelled = true; }; // cleanup
}, [filters]);
```

### Pattern "tre stati" nella UI

```jsx
{isLoading ? (
    <p>Caricamento...</p>
) : errorMessage ? (
    <p className="text-danger">{errorMessage}</p>
) : products.length > 0 ? (
    products.map((p) => <ProductCard key={p.slug} product={p} />)
) : (
    <p>Nessun risultato</p>
)}
```

### Operazioni di scrittura (POST/PUT/PATCH/DELETE)

```jsx
export async function createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),    // → stringa JSON
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || "Errore durante l'ordine");
    }

    return response.json();
}
```

### Debounce: evitare una chiamata ad ogni tasto premuto

```jsx
useEffect(() => {
    const timer = setTimeout(() => {
        fetchProducts(filters).then(/* ... */);
    }, 500);                    // aspetta 500ms che l'utente smetta di digitare

    return () => clearTimeout(timer);   // se i filtri cambiano, annulla la chiamata pendente
}, [searchTerm, category /* ... */]);
```

### Cache / riuso

Per dati letti più volte (es. prodotti suggeriti), si può usare `useMemo` o una mappa cache. Non è obbligatorio: solo se la stessa chiamata viene fatta troppo spesso.

---

## 10. Mini-mappa mentale

```
Stato locale          → useState
Effetti collaterali   → useEffect  (sempre con dipendenze + cleanup)
Valore che persiste    → useRef
Dati condivisi globali → Context (createContext + useContext / hook custom)
Logica riusabile       → custom hook (useXxx)
Navigazione            → react-router (Routes, Route, Link, useNavigate, useSearchParams)
API                    → fetch in utils/ + useEffect nel componente
                       → SEMPRE check di response.ok, stati isLoading/errorMessage
```

### Checklist anti-bug

1. `key` stabile nei `.map()`.
2. Array/oggetti sempre copiati (`...`) prima di modificare.
3. `setState` con funzione quando il nuovo valore dipende dal precedente.
4. Cleanup di timer/listener nel return di `useEffect`.
5. Dipendenze complete nell'array di `useEffect` (guarda il lint).
6. `response.ok` dopo ogni `fetch`.
7. Nesting dei Provider coerente con gli `useContext` che li consumano.
