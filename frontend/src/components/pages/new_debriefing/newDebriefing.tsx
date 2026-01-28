import React, { useState, type FormEvent } from 'react';
import axios from 'axios';

const NewDebriefing: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend endpoint
      const response = await axios.post("http://localhost:3001/api/debriefings", {
        title,
      });
      setMessage(`Created debriefing: ${response.data.title}`);
      setTitle("");
    } 
    catch (error) {
      console.error('There was an error saving the data!', error);
      setMessage('Error saving data.' + error);
    }
  };

  return (
    <div>
      <h2>Save Data to SQL Database</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
        </div>
        <button type="submit">Save Data</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewDebriefing;
