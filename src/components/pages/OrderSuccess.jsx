import { useLocation, Link } from 'react-router-dom';

function OrderSuccess() {
    const location = useLocation();
    const order = location.state?.order; 
    const paymentDetails = location.state?.paymentDetails;

    return (
        <div className="products-page min-vh-100 d-flex align-items-center py-5">
            <div className="container text-center p-font">
                
                <div className="mb-4">
                    <i className="bi bi-shield-check text-info" style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 0 15px #00ffff)' }}></i>
                </div>

                <h2 className="cyber-title title-font mb-3">Protocollo Completato</h2>
                <p className="fs-5 text-white-50 mb-5">La transazione è andata a buon fine. Collegamento sicuro stabilito.</p>
                
                {order ? (
                    <div className="cyber-form p-4 my-4 mx-auto text-start text-white" style={{ maxWidth: '550px' }}>
                        <h4 className="title-font mb-4 text-info border-bottom border-secondary pb-2">Riepilogo Trasazione:</h4>
                        
                        <div className="row g-3">
                            <div className="col-12 col-sm-6">
                                <span className="text-white-50 small d-block">NUMERO ORDINE</span>
                                <strong className="fs-5 text-uppercase">#{order.invoiceNum}</strong>
                            </div>

                            <div className="col-12 col-sm-6">
                                <span className="text-white-50 small d-block">METODO DI PAGAMENTO</span>
                                <strong className="fs-6 text-uppercase text-info">STRIPE</strong>
                            </div>

                            <div className="col-12">
                                <span className="text-white-50 small d-block">NUMERO PER IL TRACKING</span>
                                <code className="text-warning fs-6 bg-dark px-2 py-1 rounded border border-secondary d-inline-block mt-1">
                                    {order.tracking_number}
                                </code>
                            </div>

                            {paymentDetails && (
                                <>
                                    <div className="col-12 my-1">
                                        <hr className="border-secondary opacity-25 m-0" />
                                    </div>

                                    <div className="col-12">
                                        <span className="text-white-50 small d-block">INTESTATARIO AUTORIZZATO</span>
                                        <span className="fs-6 fw-bold tracking-wider text-uppercase">{paymentDetails.cardHolder}</span>
                                    </div>

                                    <div className="col-12">
                                        <span className="text-white-50 small d-block">TERMINALE DI PAGAMENTO</span>
                                        <span className="fs-6 font-monospace opacity-90">
                                            <i className="bi bi-credit-card-2-front pe-2 text-info"></i>
                                            •••• •••• •••• {paymentDetails.lastFour}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="cyber-line my-4"></div>
                        
                        <p className="small opacity-75 m-0 italic text-center">
                            <i className="bi bi-terminal me-2"></i>
                            Una mail di conferma è stata inviata al tuo indirizzo mail.
                        </p>
                    </div>
                ) : (
                    <div className="cyber-total-box p-4 my-4 mx-auto text-white" style={{ maxWidth: '500px' }}>
                        <p className="fs-5 m-0 fw-bold text-uppercase tracking-wider">Grazie per il tuo acquisto!</p>
                    </div>
                )}

                <div className="mt-5">
                    <Link to="/" className="btn cyber-btn py-3 px-4">
                        <span className="btn-shop-text text-uppercase tracking-wider fw-bold">Ritorna allo Shop</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;