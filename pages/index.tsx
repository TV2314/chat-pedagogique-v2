import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bienvenue sur le chat interactif pédagogique de la TV Creative Academy.\nCet outil a été conçu pour vous accompagner de manière personnalisée, selon ma méthode.\nVous pouvez poser vos questions librement : que vous travailliez sur une scène, un ressenti émotionnel, ou une difficulté technique, le chat vous guide.\nDans cette version découverte, vous avez accès à plusieurs modèles d’émotion, ainsi qu’à une scène test de Chaplin \"l'enfer des machines\" pour vous entraîner.\nC’est p...
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      let response = "Merci pour ta question ! Peux-tu me préciser si tu travailles sur une scène ou si c’est une question générale ?";
      if (input.toLowerCase().includes("tension")) {
        response = "Pour créer une tension progressive, pense à construire un ostinato discret, jouer sur le crescendo orchestral et utiliser des harmonies suspendues.";
      }
      const simulatedResponse = { role: "assistant", content: response };
      setMessages((prev) => [...prev, simulatedResponse]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, minHeight: 400, background: "#fafafa" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              margin: "0.5rem 0",
              background: msg.role === "assistant" ? "#eee" : "#0070f3",
              color: msg.role === "assistant" ? "#000" : "#fff",
              padding: 8,
              borderRadius: 4
            }}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", marginTop: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pose ta question..."
          style={{ flexGrow: 1, padding: 8, marginRight: 8 }}
        />
        <button onClick={handleSend} style={{ padding: "8px 16px" }}>Envoyer</button>
      </div>
    </div>
  );
}