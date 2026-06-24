import { useState } from 'react';
import ProductCard from './ProductCard';

function ProductsCarousel({ items = [], loading, error, title }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    const nextIndex = (currentIndex + 1) % items.length;
    const nextProduct = () => setCurrentIndex(nextIndex);
    const prevProduct = () => setCurrentIndex(prevIndex);

    if (loading) return <p>Caricamento...</p>;
    if (items.length === 0) return <p>Nessun prodotto disponibile.</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div className="carousel container-fluid my-4">
            <h2 className="title-font text-center mb-4">{title}</h2>
            
            {/* Controlli del carosello */}
            <div className="controls text-center mb-3">
                <button className="btn btn-outline-info me-2" onClick={prevProduct}>←</button>
                <button className="btn btn-outline-info" onClick={nextProduct}>→</button>
            </div>

            {/* Griglia Responsiva delle Card */}
            <div className="row justify-content-center align-items-stretch">
                {/* Card di Sinistra: Visibile SOLO da MD in su */}
                <div className="col-md-4 d-none d-md-block opacity-75 transform-scale side-card">
                    <ProductCard product={items[prevIndex]} displayed="carousel" />
                </div>
                
                {/* Card Centrale: Sempre visibile */}
                <div className="col-12 col-md-4">
                    <ProductCard product={items[currentIndex]} displayed="carousel" />
                </div>
                
                {/* Card di Destra: Visibile SOLO da MD in su */}
                <div className="col-md-4 d-none d-md-block opacity-75 transform-scale side-card">
                    <ProductCard product={items[nextIndex]} displayed="carousel" />
                </div>
            </div>
        </div>
    );
}

export default ProductsCarousel;