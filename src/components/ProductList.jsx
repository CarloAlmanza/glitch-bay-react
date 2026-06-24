import ProductCard from "./ProductCard";

function ProductList({ products, displayed }) {
    return (
        <div className="container">
            <div className="row products-wrapper">
                
                {products?.map((product) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex g-4" key={product.slug}>
                        <ProductCard product={product} displayed={displayed}/>
                    </div>
                ))}

                
            </div>
        </div>

    )
}
export default ProductList;