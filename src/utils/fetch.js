const API_URL = import.meta.env.VITE_API_URL;

// Fetch per tutte le reliquie
// name coincide con name passato nel Service in back
export async function fetchRelics (name = "") {
    try {
        const params = new URLSearchParams();
        if (name.trim()){
            params.set("name", name.trim());
        }

        const query = params.toString();
        // Se abbiamo le query abbiamo api_url?query
        // altrimenti solo api_url
        const url = query ? `${API_URL}?${query}` : API_URL;

        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`Errore recupero reliquie: ${response.status}`)
        }

        const data = await response.json();
        console.log('Reliquie:', data);
        return data;

    } catch (error) {
        console.error('Errore', error);
        return null
    }
};

// Fetch reliquia singola
export async function fetchRelicById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`)

        if (!response.ok){
            throw new Error (`Errore recupero reliquia con id ${id}`)
        }

        const data = await response.json();

        console.log('Prodotto singolo: ', data);
        
        return data;

    } catch (error){
        console.error('Errore'. error);
        return null;
    }
};