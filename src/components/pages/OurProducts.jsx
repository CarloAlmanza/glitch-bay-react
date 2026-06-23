import { useState, useEffect, useMemo } from "react";
import ProductList from "../ProductList";
import { fetchAll } from "../../utils/fetch";

function OurProducts() {
    const [products, setProducts] = useState([]);

    // Stati per la ricerca, il filtro e l'ordinamento
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // "" | "asc" | "desc"

    useEffect(() => {
        fetchAll()
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => console.error("Errore nel recupero prodotti:", err));
    }, []);

    // Estraiamo le categorie uniche dai prodotti per popolare dinamicamente la select
    const categories = useMemo(() => {
        const allCategories = products.map((p) => p.category).filter(Boolean);
        return [...new Set(allCategories)];
    }, [products]);

    // Logica combinata di Filtro + Ricerca + Ordinamento
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // 1. Filtro per Nome (Ricerca testuale)
        if (searchQuery.trim() !== "") {
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Filtro per Categoria
        if (selectedCategory !== "") {
            result = result.filter((product) => product.category === selectedCategory);
        }

        // 3. Ordinamento per Prezzo
        if (sortOrder === "asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortOrder]);

    return (
        <main className="products-main">
            {/* Barra dei Controlli (Searchbar, Filtri, Ordinamento) */}
            <section className="controls-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>

                {/* Input di Ricerca */}
                <input
                    type="text"
                    placeholder="Cerca prodotto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                {/* Select Categoria */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Tutte le categorie</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Select Ordinamento Prezzo */}
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="sort-select"
                >
                    <option value="">Ordina per...</option>
                    <option value="asc">Prezzo: Crescente</option>
                    <option value="desc">Prezzo: Decrescente</option>
                </select>
            </section>

            {/* Lista Prodotti Filtrata */}
            <ProductList products={filteredAndSortedProducts} displayed={'product-page'} />
        </main>
    );
}

export default OurProducts;