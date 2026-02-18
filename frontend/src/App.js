// frontend/src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/messages");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submit = async () => {
    if (!form.name || !form.message) return alert("Fill both fields!");
    try {
      await axios.post("http://localhost:5000/messages", form);
      setForm({ name: "", message: "" });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>3-Tier App</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{ marginRight: "10px" }}
      />
      <input
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button onClick={submit} style={{ marginLeft: "10px" }}>
        Send
      </button>

      <ul style={{ marginTop: "20px" }}>
        {messages.map((m, i) => (
          <li key={i}>
            <b>{m.name}:</b> {m.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
