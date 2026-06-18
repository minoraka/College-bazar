import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAdPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contacts, setContacts] = useState("");
  const [category, setCategory] = useState("textbooks");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !contacts) return;

    // пока mock
    console.log({ title, description, contacts, category });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-3">
      <input
        className="border p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2"
        placeholder="Contacts"
        value={contacts}
        onChange={(e) => setContacts(e.target.value)}
      />

      <select
        className="border p-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="textbooks">Textbooks</option>
        <option value="clothes">Clothes</option>
        <option value="electronics">Electronics</option>
        <option value="other">Other</option>
      </select>

      <button className="bg-black text-white p-2 rounded">
        Create
      </button>
    </form>
  );
}