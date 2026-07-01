import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Importazione da react-router-dom
import ProductList from "../ProductList";
import { fetchCategories } from "../../utils/fetch";
import BtnScrollUp from "../BtnScrollUp";
import { ArrowDown, ArrowUp, Grid3x3Gap, ListUl } from "react-bootstrap-icons";
//nada

function OurProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState('grid');
    const [windowSize, setWindowSize] = useState(window.innerWidth);


    const searchQuery = searchParams.get("search") || "";
    const selectedCategoryName = searchParams.get("category") || "";
    const selectedOrder = searchParams.get("order") || "";
    const directionParam = searchParams.get("direction") || "DESC";
    const direction = directionParam === "ASC";



    const orderOptions = [
        { label: 'Nome', value: 'name' },
        { label: 'Prezzo', value: 'price' },
        { label: 'Data', value: 'created_at' },
    ];


    const updateSearchParams = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setViewMode('grid');
            }
            setWindowSize(window.innerWidth);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    useEffect(() => {
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
            const searchedString = searchParams.get('search') || '';
            const discountFilter = searchParams.get('filter') || '';

            if (searchedString.trim() !== '') {
                params.append('search', searchedString.trim());
            }

            if (discountFilter === 'discount') {
                params.append('filter', 'discount');
            }
            else if (selectedCategoryName !== "" && categories.length > 0) {
                const foundCategory = categories.find(category => {
                    return category.name.toLowerCase() === selectedCategoryName.toLowerCase()
                })
                if (foundCategory) {
                    params.append('category', foundCategory.id);
                }
            }

            if (selectedOrder !== '') {
                params.append('order', selectedOrder);
                params.append('direction', direction ? 'ASC' : 'DESC');
            }

            const queryString = params.toString();
            const url = `http://localhost:3000/products${queryString ? `?${queryString}` : ""}`;
            try {
                const result = await fetch(url);
                if (!result.ok) {
                    throw new Error(`Errore HTTP! Stato: ${result.status}`)
                }
                const data = await result.json();
                const finalProductsList = data.result;
                setProducts(finalProductsList ?? []);
            } catch (error) {
                console.error("Errore nel recupero prodotti filtrati:", error);
                setProducts([]);
            }
        }

        if (categories.length > 0 || selectedCategoryName === '' || searchParams.get('filter') === 'discount') {
            fetchFilteredProducts();
        }

    }, [searchParams, categories, searchQuery, selectedCategoryName, selectedOrder, direction]);

    return (
        <div className="products-page">
            <div className="md-2 ms-md-4">
                <BtnScrollUp />
            </div>

            <main className="products-main container py-5">

                <section className="row g-3 justify-content-center mb-5 cyber-controls-bar align-items-center">

                    {/* SEARCH */}
                    <div className="col-12 col-md-5">
                        <div className="input-group">
                            <span className="input-group-text cyber-addon"><i className="bi bi-search"></i></span>
                            <input
                                type="text"
                                placeholder="Cerca prodotto..."
                                value={searchQuery}
                                onChange={(e) => updateSearchParams("search", e.target.value)}
                                className="form-control cyber-input p-font"
                            />
                        </div>
                    </div>

                    {/* SELECT PER FILTRARE */}
                    <div className="col-6 col-md-4">
                        <select
                            value={searchParams.get("filter") === "discount" ? "discount" : selectedCategoryName}
                            onChange={(e) => {
                                const val = e.target.value;
                                const newParams = new URLSearchParams(searchParams);

                                if (val === "discount") {
                                    newParams.set("filter", "discount");
                                    newParams.delete("category");
                                } else {
                                    newParams.delete("filter");
                                    if (val) {
                                        newParams.set("category", val);
                                    } else {
                                        newParams.delete("category");
                                    }
                                }
                                setSearchParams(newParams);
                            }}
                            className="form-select cyber-select p-font">
                            <option value="">Filtra per</option>
                            <option value="discount">In Sconto</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SELECT & BUTTON ORDER */}
                    <div className="col-6 col-md-3 d-grid gap-2 d-flex">
                        <select
                            value={selectedOrder}
                            onChange={(e) => {
                                const val = e.target.value;
                                const newParams = new URLSearchParams(searchParams);
                                if (val) {
                                    newParams.set("order", val);
                                    if (!newParams.has("direction")) {
                                        newParams.set("direction", "DESC");
                                    }
                                } else {
                                    newParams.delete("order");
                                    newParams.delete("direction");
                                }
                                setSearchParams(newParams);
                            }}
                            className="form-select cyber-select p-font">
                            <option value="">Ordina Per</option>
                            {orderOptions.map((opt) => (
                                <option key={opt.value} value={opt.value} className="text-capitalize">
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        {selectedOrder && (
                            <button
                                type="button"
                                onClick={() => updateSearchParams("direction", direction ? "DESC" : "ASC")}
                                className={`btn  p-font ${direction ? 'btn-warning' : 'btn-outline-light'}`}
                            >
                                {direction ? <ArrowDown /> : <ArrowUp />}
                            </button>
                        )}
                    </div>
                    {windowSize >= 768 && (<div className="col-12 col-md-2 justify-content-center d-flex">
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
                    </div>)}
                </section>

                {products && products.length > 0 ? (
                    <ProductList products={products} displayed={'product-page'} viewMode={viewMode} />
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