

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
};

async function fetchFive() {
    try {
        const response = await fetch(`http://localhost:3000/products/initial`);

        if (!response.ok) {
            throw new Error('Errore di comunicazione col server');
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Errore', error);
        return null
    }
};

async function fetchTopSeller() {
    try {
        const response = await fetch(`http://localhost:3000/products/topseller`);

        if (!response.ok) {
            throw new Error('Errore di comunicazione col server');
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Errore', error);
        return null
    }
};

async function fetchSingle(slug) {
    
    
    try {
        const response = await fetch(`http://localhost:3000/products/${slug}`);
        console.log(response);
        if (!response.ok) {
            throw new Error('Errore di comunicazione col server');
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Errore', error);
        return null
    }
};

export { fetchAll, fetchFive, fetchTopSeller, fetchSingle };