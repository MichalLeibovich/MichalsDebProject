import { useState } from "react";

export default function NewDebriefing() {
  const [title, setTitle] = useState<string>("");

  const handleSave = async () => {
    if (!title) {
      alert("Enter a title");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/debriefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to save debriefing");
      }

      const data = await response.json();
      console.log(data);
      alert("Debriefing saved!");
      setTitle(""); // clear input after saving
    } catch (error) {
      console.error(error);
      alert("Error saving debriefing: " + error );
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Debriefing title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
