import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const blanckOBJ = {
    payment_methods: '',
    firstName: '',
    lastName: '',
    mail: '',
    address: '',
    phone: '',
    products: []
}

function CheckoutSummary() {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
    const [formData, setFormData] = useState(blanckOBJ);
    const navigate = useNavigate();

    const changeHandler = (event) => {
        const { name, value } = event.target;
        const tempData = { ...formData, [name]: value };
        setFormData(tempData);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        
        const productsList = cart.map(product => {
            const { slug, price, discounted_price, quantity } = product;
            return {
                slug: slug,
                paid: price === discounted_price ? price : discounted_price,
                qty: quantity
            }
        })
        const finalOrderData = {...formData, products: productsList};

        try {
            const response = await fetch("http://localhost:3000/invoices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalOrderData),
            });

            if (response.ok) {
                const resData = await response.json(); 
                const orderInfo = resData.data;
                clearCart();
                setFormData(blanckOBJ);
                navigate('/order_success', { state: { order: orderInfo } });
            } else {
                const errorData = await response.json();
                alert(`Errore: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Errore:", error);
        }
    };

    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].quantity;
    };

    if (cart.length === 0) {
        return (
            <div className="products-page min-vh-100 d-flex align-items-center justify-content-center text-center text-white p-font">
                <div>
                    <p className="fs-4">Il tuo carrello è vuoto.</p>
                    <button className="btn cyber-btn mt-3" onClick={() => navigate('/products')}>
                        <span className="btn-shop-text">Torna ai Prodotti</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="products-page min-vh-100 py-5">
            <div className="container p-font">
                <h2 className="title-font text-center mb-5 cyber-title">Riepilogo Ordine</h2>
                
                <div className="row g-4">
                    {/* COLONNA SINISTRA: Lista prodotti nel carrello */}
                    <div className="col-12 col-lg-6">
                        <h4 className="title-font mb-4 text-white">I tuoi Terminali</h4>
                        <div className="row g-2">
                            {cart.map((item) => (
                                <div key={item.slug} className="col-12">
                                    <div className="cyber-checkout-card p-3">
                                        <div className="d-flex justify-content-between align-items-center text-white">
                                            <div className="pe-2 text-truncate max-w-60">
                                                <div className="fw-bold text-truncate small text-info">{item.name}</div>
                                                <div className="small opacity-75">{item.quantity}x — €{item.price}</div>
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                                <button 
                                                    className="btn btn-sm btn-outline-info d-flex align-items-center justify-content-center p-2" 
                                                    onClick={() => increaseQuantity(item.slug)}
                                                    title="Aumenta quantità"
                                                >
                                                    <i className="bi bi-plus-lg"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-info d-flex align-items-center justify-content-center p-2" 
                                                    onClick={() => decreaseQuantity(item.slug)}
                                                    title="Diminuisci quantità"
                                                >
                                                    <i className="bi bi-dash-lg"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center ms-2 p-2" 
                                                    onClick={() => removeFromCart(item.slug)}
                                                    title="Elimina prodotto"
                                                >
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="cyber-total-box mt-4 p-4 text-center">
                            <h3 className="cyber-title m-0">Totale: €{totalPrice.toFixed(2)}</h3>
                        </div>
                    </div>

                    {/* COLONNA DESTRA: Form di fatturazione */}
                    <div className="col-12 col-lg-6">
                        <h4 className="title-font mb-4 text-white">Dati Spedizione / Protocollo</h4>
                        <form onSubmit={submitHandler} className="cyber-form p-4">
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="name" className="form-label text-white-50 small">Nome</label>
                                    <input type="text" id="name" name="firstName" className="form-control cyber-input" onChange={changeHandler} value={formData.firstName} required />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="surname" className="form-label text-white-50 small">Cognome</label>
                                    <input type="text" id="surname" name="lastName" className="form-control cyber-input" onChange={changeHandler} value={formData.lastName} required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label text-white-50 small">Indirizzo di Consegna</label>
                                    <input type="text" id="address" name="address" className="form-control cyber-input" onChange={changeHandler} value={formData.address} required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="mail" className="form-label text-white-50 small">Mail di Rete</label>
                                    <input type="email" id="mail" name="mail" className="form-control cyber-input"
                                        pattern="[a-zA-Z0-9._%\+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                                        placeholder="esempio@dominio.com"
                                        onChange={changeHandler}
                                        value={formData.mail}
                                        required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="phone" className="form-label text-white-50 small">Recapito Telefonico Comms</label>
                                    <input type="tel" id="phone" name="phone" className="form-control cyber-input" minLength={10}
                                        pattern="^\+39\s\d{3}\s\d{7}$"
                                        placeholder="+39 333 1234567"
                                        onChange={changeHandler}
                                        value={formData.phone}
                                        required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="payment" className="form-label text-white-50 small">Canale di Pagamento</label>
                                    <select id="payment" name="payment_methods" className="form-select cyber-select" onChange={changeHandler} value={formData.payment_methods} required>
                                        <option disabled value="">Scegli un'opzione...</option>
                                        <option value="stripe">Stripe (Valuta Standard)</option>
                                        <option value="paypal">PayPal (Crediti Rete)</option>
                                        <option value="crypto">Crypto (Chiave Decentralizzata)</option>
                                    </select>
                                </div>
                                <div className="col-12 mt-4 d-grid">
                                    <button disabled={cart.length === 0} type="submit" className="btn cyber-btn w-100 py-3">
                                        <span className="btn-shop-text text-uppercase tracking-wider fw-bold">Conferma Acquisto</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutSummary;