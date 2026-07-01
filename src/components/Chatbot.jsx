import { useState } from "react";
import ChatCard from '../components/ChatCard.jsx';

// Passiamo una prop generica (es: onClose) per gestire la chiusura dal componente padre
function Chatbot() {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [onClose, setOnClose] = useState(true);

    const handleOnClose = () => {
        setOnClose(!onClose);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!message.trim()) return;

        const currentMessage = message;
        setMessage('');
        setLoading(true);

        const updatedHistory = [...history, { sender: 'user', text: currentMessage }];
        setHistory(updatedHistory);

        try {
            const response = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ history: updatedHistory })
            });

            const data = await response.json();
            setHistory(prev => [...prev, { sender: 'bot', text: data }]);
        } catch (error) {
            console.error(error);
            setHistory(prev => [...prev, { sender: 'bot', text: "Errore di connessione." }]);
        } finally {
            setLoading(false);
        }
    }

    return !onClose ? (
        <div className='chatbot-wrapper'>
        <div className="chatbot-container no-scrollbar w-100 h-100 bg-black text-white d-flex flex-column justify-content-between p-3 rounded border border-secondary shadow-lg">
            
            {/* NUOVO: Header del Chatbot con la X di chiusura */}
            <div className="chat-header d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary">
                <span className="fw-bold p-font text-info">Cyber Fox</span>
                <button 
                    type="button" 
                    className="btn-close-chat bg-transparent border-0 text-secondary p-0"
                    onClick={handleOnClose}
                    aria-label="Chiudi chat"
                >
                    &times;
                </button>
            </div>
            
            {/* Area Messaggi della Chat */}
            <div className="chat-messages-area flex-grow-1 overflow-y-auto mb-3 pe-1">
                {history.length === 0 && !loading ? <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center p-font">
                                                        <div className="w-25">
                                                            <img style={{translate: '10% 0'}} src="imgs/img_elements_glitch/cyber_fox.png" alt="cyber-fox" className="img-fluid"/>
                                                        </div>
                                                        <p className="chiedi-chatbot">Chiedi pure</p>
                                                    </div> 
                    : history.map((msg, i) => {
                    const isUser = msg.sender === 'user';
                    const textToShow = msg.text.text || msg.text;

                    return (
                        <div key={i} className={`d-flex flex-column mb-3 ${isUser ? 'align-items-end' : 'align-items-start'}`}>
                            <div className={`chat-bubble p-2 rounded-3 small ${
                                isUser 
                                    ? 'bg-info text-dark fw-bold chat-bubble-user' 
                                    : 'bg-dark text-light border border-secondary chat-bubble-bot'
                            }`}>
                                <div className="chat-author mb-1 opacity-75">
                                    {isUser ? 'Tu' : 'Fox'}
                                </div>
                                <p className="mb-0 p-font">{textToShow}</p>
                            </div>

                            {msg.text.products && msg.text.products.length > 0 && (
                                <div className="row g-4 w-100 mt-2 justify-content-center mb-2">
                                    {msg.text.products.map(product => (
                                        <div key={product.slug} className="col-12 d-flex justify-content-center">
                                            <ChatCard product={product} clickHandler={handleOnClose} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {loading && (
                    <div className="d-flex align-items-center gap-2 text-info small p-font">
                        <div className="spinner-border spinner-border-sm" role="status"></div>
                        <span>Sto elaborando...</span>
                    </div>
                )}
            </div>

            {/* Form di Input inferiore */}
            <form onSubmit={handleSubmit} className="d-flex gap-2 bg-dark p-2 rounded border border-info">
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Chiedi qualcosa all'assistente..."
                    className="form-control bg-transparent border-0 text-white p-font shadow-none"
                    disabled={loading}
                />
                <button 
                    type="submit" 
                    disabled={loading} 
                    className="btn btn-info fw-bold px-3 p-font text-dark"
                >
                    Invia
                </button>
            </form>
        </div>
        </div>
    ) : (<div className="cyber-fox-wrapper" onClick={handleOnClose}>
        <img src="/imgs/img_elements_glitch/cyber_fox.png" alt="fox-img" className=" img-fluid h-100"/>
    </div>);
}

export default Chatbot;