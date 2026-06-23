import { Link } from "react-router-dom";

function ProductCard({ product, displayed }) {
    const hasDiscount = product.discounted_price && product.discounted_price !== product.price;
    return (
        <div className="col-6 col-md-4 col-lg-3 d-flex g-4"> {/* 1. d-flex sulla colonna */}
            <div className="card w-100"> {/* 2. w-100 (e la tua classe cyberpunk) */}
                <div className="card-body d-flex flex-column"> {/* 3. d-flex e flex-column sul body */}

                    <img src={product.img} alt="product-img" className="img-fluid mb-3" />

                    <h5 className="card-title">{product.name}</h5>

                    <div className="mt-auto mb-2">
                        {hasDiscount ? (
                            <>
                                <span className="text-decoration-line-through">
                                    ${product.price}
                                </span>
                                <span>
                                    ${product.discounted_price}
                                </span>
                            </>
                        ) : (
                            <h3>${product.price}</h3>
                        )}
                    </div>
                    
                    {displayed === 'product-detail' ? <div className="mt-auto">
                        <p className="card-text">{product.description}</p>
                    </div> : null}

                    {displayed !== 'product-detail' ? 
                    <Link to={`/products/${product.slug}`} className="btn btn-primary mt-3">Esplora</Link>
                     : null}
                    
                    

                </div>
            </div>
        </div>

    )
}

export default ProductCard;