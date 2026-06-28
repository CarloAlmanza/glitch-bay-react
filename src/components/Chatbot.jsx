import { useState } from "react";

function Chatbot() {
    const [message, setMessage] = useState('');
    // La history vive qui temporaneamente. Se l'utente aggiorna la pagina (F5), si azzera.
    const [history, setHistory] = useState([]); 
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!message.trim()) return;

        const currentMessage = message;
        setMessage('');
        setLoading(true);

        // 1. Prepariamo la nuova history includendo l'ultimo messaggio dell'utente
        const updatedHistory = [...history, { sender: 'user', text: currentMessage }];
        setHistory(updatedHistory);

        try {
            // 2. Inviamo l'INTERA history temporanea al backend
            const response = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ history: updatedHistory })
            });

            const data = await response.json();

            // 3. Aggiungiamo la risposta di Claude alla history dello stato
            setHistory(prev => [...prev, { sender: 'bot', text: data.text }]);
        } catch (error) {
            console.error(error);
            setHistory(prev => [...prev, { sender: 'bot', text: "Errore di connessione." }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
                {history.map((msg, i) => (
                    <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <strong>{msg.sender === 'user' ? 'Tu: ' : 'Claude: '}</strong>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit" disabled={loading}>Invia</button>
            </form>
        </div>
    );
}

export default Chatbot;