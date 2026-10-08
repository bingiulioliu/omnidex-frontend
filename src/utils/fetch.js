const API_URL = import.meta.env.VITE_API_URL;

// Fetch per tutte le reliquie
export async function fetchRelics () {
    try {
        const response = await fetch(API_URL);

        if (!response.ok){
            throw new Error('Errore recupero reliquie')
        }

        const data = await response.json();
        console.log('Reliquie:', data);
        return data.results;

    } catch (error) {
        console.error('Errore', error);
        return null
    }
};

// Fetch reliquia singola
export async function fetchRelicById(id) {
    try {
        const response = await fetch(`API_URL/${id}`)

        if (!response.ok){
            throw new Error (`Errore recupero reliquia con id ${id}`)
        }

        const data = await response.json();

        console.log('Prodotto singolo: ', data);
        
        return data.results;

    } catch (error){
        console.error('Errore'. error);
        return null;
    }
};