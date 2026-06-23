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
        <main className="products-main container py-5">
            {/* Barra dei Controlli con Grid di Bootstrap */}
            <section className="row g-3 justify-content-center mb-5 cyber-controls-bar">

                {/* Input di Ricerca */}
                <div className="col-12 col-md-5">
                    <div className="input-group">
                        <span className="input-group-text cyber-addon">🔍</span>
                        <input
                            type="text"
                            placeholder="Cerca hardware..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control cyber-input p-font"
                        />
                    </div>
                </div>

                {/* Select Categoria */}
                <div className="col-6 col-md-3">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="form-select cyber-select p-font"
                    >
                        <option value="">Tutte le categorie</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Select Ordinamento Prezzo */}
                <div className="col-6 col-md-3">
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="form-select cyber-select p-font"
                    >
                        <option value="">Ordina per...</option>
                        <option value="asc">Prezzo: Crescente</option>
                        <option value="desc">Prezzo: Decrescente</option>
                    </select>
                </div>
            </section>

            {/* Lista Prodotti Filtrata */}
            <ProductList products={filteredAndSortedProducts} displayed={'product-page'} />
        </main>
    );
}

export default OurProducts;