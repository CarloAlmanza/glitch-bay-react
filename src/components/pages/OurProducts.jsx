import { useState, useEffect } from "react";
import ProductList from "../ProductList";
import { fetchAll, fetchCategories } from "../../utils/fetch";
import { ArrowDown, ArrowUp, Grid3x3Gap, ListUl } from "react-bootstrap-icons";

function OurProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [direction, setDirection] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState('');
    const orderOptions = [{ label: 'Nome', value: 'name' }, { label: 'Prezzo', value: 'price' }, { label: 'Data', value: 'created_at' }];
    const [viewMode, setViewMode] = useState('grid');


    useEffect(() => {
        const getProducts = async () => {
            const productsFetched = await fetchAll();
            if (productsFetched) {
                setProducts(productsFetched);
            }
        };
        getProducts();

        const getCategories = async () => {
            const categoriesFetched = await fetchCategories();
            if (categoriesFetched) {
                setCategories(categoriesFetched);
            }
        };
        getCategories();
    }, []);


    useEffect(() => {
        const fetchFilteredProducts = async () => {
            const params = new URLSearchParams();

            if (searchQuery.trim() !== "") {
                params.append("search", searchQuery.trim());
            }

            if (selectedCategory !== "") {
                params.append("category", selectedCategory); // Passa l'ID della categoria
            }

            if (selectedOrder !== '') {
                params.append('order', selectedOrder);

                if (direction) {
                    params.append('direction', 'ASC');
                } else {
                    params.append('direction', 'DESC');
                }
            }



            const queryString = params.toString();
            const url = `http://localhost:3000/products${queryString ? `?${queryString}` : ""}`;

            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`Errore HTTP! Stato: ${res.status}`);
                }
                const data = await res.json();
                const finalProducts = data.result

                setProducts(finalProducts ?? []);
            } catch (err) {
                console.error("Errore nel recupero prodotti filtrati:", err);
                setProducts([]);
            }
        };

        fetchFilteredProducts();
    }, [searchQuery, selectedCategory, selectedOrder, direction]);

    return (
        <div className="products-page">
            <main className="products-main container py-5">
                <section className="row g-3 justify-content-center mb-5 cyber-controls-bar align-items-center">

                    {/* SEARCH */}
                    <div className="col-12 col-md-5">
                        <div className="input-group">
                            <span className="input-group-text cyber-addon"><i className="bi bi-search"></i></span>
                            <input
                                type="text"
                                placeholder="Cerca hardware..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control cyber-input p-font"
                            />
                        </div>
                    </div>

                    {/* SELECT CATEGORIES */}
                    <div className="col-6 col-md-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="form-select cyber-select p-font"
                        >
                            <option value="">Tutte le categorie</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* BUTTON ORDER */}
                    <div className="col-6 col-md-3 d-grid">
                        <select
                            value={selectedOrder}
                            onChange={(e) => setSelectedOrder(e.target.value)}
                            className="form-select cyber-select p-font"
                        >
                            <option value="">Ordina Per</option>
                            {orderOptions.map((opt) => (

                                <option key={opt.value} value={opt.value} className=" text-capitalize">
                                    {opt.lable}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setDirection(!direction)}
                            className={`btn p-font ${direction ? 'btn-warning' : 'btn-outline-light'}`}
                        >
                            {direction ? <ArrowDown /> : <ArrowUp />}
                        </button>

                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-end justify-content-center">
                        <div className="btn-group" role="group" aria-label="Visualizzazione prodotti">
                            <button
                                type="button"
                                className={`btn ${viewMode === 'grid' ? 'btn-warning' : 'btn-outline-light'}`}
                                onClick={() => setViewMode('grid')}
                                title="Visualizzazione a griglia"
                            >
                                <Grid3x3Gap />
                            </button>
                            <button
                                type="button"
                                className={`btn ${viewMode === 'list' ? 'btn-warning' : 'btn-outline-light'}`}
                                onClick={() => setViewMode('list')}
                                title="Visualizzazione a lista"
                            >
                                <ListUl />
                            </button>
                        </div>
                    </div>
                </section>

                {products && products.length > 0 ? (
                    <ProductList products={products} displayed={'product-page'} viewMode={viewMode}/>
                ) : (
                    <div className="text-center text-white py-5">
                        <p className="fs-4 p-font">Nessun prodotto trovato</p>
                    </div>
                )}


            </main>
        </div>
    );
}

export default OurProducts;