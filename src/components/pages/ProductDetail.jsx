import { useEffect, useState } from "react"
import { fetchSingle } from "../../utils/fetch.js"
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard.jsx";

function ProductDetail() {
    const [product, setProduct] = useState([]);
    const { slug } = useParams();
    useEffect(() => {
        fetchSingle(slug).then(product => {
            setProduct(product);
        })
    }, []);


    return (
        <div className="container-product-detail py-5">
            <div className="cyber-detail-card">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-center">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="img-fluid cyber-img"
                        />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="cyber-title">
                            {product.name}
                        </h1>
                        <h2 className="cyber-price mt-4">
                            ${product.price}
                        </h2>
                        <div className="cyber-line"></div>
                        <p className="cyber-description mt-4">
                            {product.description}
                        </p>
                        <button className="btn cyber-btn mt-4">
                            <p className="btn-shop-text">Aggiungi al carrello</p>
                        </button>
                        <button className="btn cyber-btn mt-4 ms-3">
                            <p className="btn-shop-text">Aggiungi alla wishlist</p>
                        </button>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default ProductDetail