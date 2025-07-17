import { useState } from "react";

type Message = {
    sender: "user" | "bot";
    text: string;
};

function Assistant() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[] | null>(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);
        setData(null);

        try {
            const res = await fetch("http://localhost:4000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: input }),
            });

            const result = await res.json();

            const botMessage: Message = {
                sender: "bot",
                text: result.answer ?? "Sorry, I couldn't understand your question.",
            };
            setMessages((prev) => [...prev, botMessage]);

            if (result.data) {
                setData(result.data);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "⚠️ Error contacting assistant." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>

            <div className="border rounded-xl p-4 h-[600px] overflow-y-auto bg-gray-50 shadow">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        <div
                            className={`inline-block px-4 py-2 rounded-xl ${msg.sender === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="text-left text-gray-500 italic">Assistant is typing...</div>
                )}

                {data && data.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">📊 Query Results</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left">
                                <thead>
                                    <tr>
                                        {Object.keys(data[0]).map((key) => (
                                            <th key={key} className="px-3 py-2 font-semibold bg-gray-100">
                                                {key}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, idx) => (
                                        <tr key={idx} className="border-b">
                                            {Object.values(row).map((val, j) => (
                                                <td key={j} className="px-3 py-2">
                                                    {String(val)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {!loading && !data && (
                    <p className="text-sm text-center text-gray-400 mt-2">Welcome!</p>
                )}
            </div>

            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={input}
                    placeholder="Ask a question..."
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow border rounded px-4 py-2"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow"
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Assistant;
