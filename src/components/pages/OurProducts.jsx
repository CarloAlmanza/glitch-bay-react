import { useState, useEffect } from "react";
import ProductList from "../ProductList";
import { fetchAll } from "../../utils/fetch";

function OurProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAll().then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Errore nel recupero prodotti:", err));
    }, []);

    return (
        <main className="products-main">
            <ProductList products={products} />
        </main>
    );
}

export default OurProducts;