

async function fetchAll() {
    try {
        const response = await fetch(`http://localhost:3000/products`);

        if (!response.ok) {
            throw new Error('Errore di comunicazione col server');
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Errore', error);
        return null
    }
}

export { fetchAll };