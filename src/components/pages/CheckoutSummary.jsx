
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


    const changeHandler = (event) => {
        const { name, value } = event.target;
        
        const tempData = { ...formData, [name]: value,};

        setFormData(tempData);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(cart);
        
        const productsList = cart.map(product => {
            const { slug, price, discounted_price, quantity } = product;
            return {
                slug: slug,
                paid: price === discounted_price ? price : discounted_price,
                qty: quantity
            }
        })
        const finalOrderData = {...formData, products:productsList};

        console.log(finalOrderData)
        try {
            const response = await fetch("http://localhost:3000/invoices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalOrderData),
            });

            if (response.ok) {
                clearCart();
                setFormData(blanckOBJ);
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
        return <div>Il tuo carrello è vuoto.</div>;
    }
    return (
        <div className=" container ">
            <h2 className='text-center'>Riepilogo Ordine</h2>
            <div className='row flex-column align-content-center'>
                {cart.map((item) => (

                    <div key={item.slug} className="col-4 card mb-2 p-2 bg-light border-secondary">
                        <div className="d-flex justify-content-between align-items-center text-dark">
                            <div style={{ maxWidth: '70%' }}>
                                <div className="fw-bold text-truncate small">{item.name}</div>
                                <div className="small text-muted">{item.quantity}x - €{item.price}</div>
                            </div>
                            <div>
                                <button className='mx-1 btn' onClick={() => increaseQuantity(item.slug)}>+</button>
                                <button className='mx-1 btn' onClick={() => decreaseQuantity(item.slug)}>-</button>
                                <button className="btn btn-sm btn-outline-danger mx-1" onClick={() => removeFromCart(item.slug)} style={{ padding: '2px 6px', fontSize: '0.75rem' }}>Elimina</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="total">
                <h3 className='text-center'>Totale: €{totalPrice.toFixed(2)}</h3>
            </div>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id='name' name='firstName' onChange={changeHandler} value={formData.firstName} required />
                </div>
                <div>
                    <label htmlFor="surname">Cognome</label>
                    <input type="text" id='surname' name='lastName' onChange={changeHandler} value={formData.lastName} required />
                </div>
                <div>
                    <label htmlFor="address">Indirizzo</label>
                    <input type="text" id='address' name='address' onChange={changeHandler} value={formData.address} required />
                </div>
                <div>
                    <label htmlFor="mail">Mail</label>
                    <input type="mail" id='mail' name='mail'
                        pattern="[a-zA-Z0-9._%\+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                        placeholder="esempio@dominio.com"
                        onChange={changeHandler}
                        value={formData.mail}
                        required />
                </div>
                <div>
                    <label htmlFor="phone">Recapito Telefonico</label>
                    <input type="tel" id='phone' name='phone' min="0" minLength={10}
                        pattern="^\+39\s\d{3}\s\d{7}$"
                        placeholder='+39 333 1234567'
                        onChange={changeHandler}
                        value={formData.phone}
                        required />
                </div>
                <select name="payment_methods" onChange={changeHandler} value={formData.payment_methods}required>
                    <option disabled value="">Scegli un opzione</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="crypto">Crypto</option>
                </select>
                <button disabled={cart.length !== 0 ? false : true} type='submit'>SGANCIA LA GRANA</button>
            </form>
        </div>
    );
}

export default CheckoutSummary;