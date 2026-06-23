import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    // Inizializza lo stato leggendo dal localStorage (se esiste)
    const [cart, setCart] = useState(() => {
        const localData = localStorage.getItem("glitch_bay_cart");
        return localData ? JSON.parse(localData) : [];
    });

    // Ogni volta che il carrello cambia, salva i dati nel localStorage
    useEffect(() => {
        localStorage.setItem("glitch_bay_cart", JSON.stringify(cart));
    }, [cart]);

    // Aggiunge un prodotto al carrello o ne incrementa la quantità
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Rimuove un elemento specifico dal carrello
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // Svuota completamente il carrello
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Hook personalizzato per un utilizzo rapido nei componenti
export function useCart() {
    return useContext(CartContext);
}