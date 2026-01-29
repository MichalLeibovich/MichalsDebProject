import React, { useState, type FormEvent } from 'react';
import axios from 'axios';

const MyAccount: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Send a POST request to your backend endpoint
            const response = await axios.post("http://localhost:3001/api/users", {
                username, password
            });
            setMessage(`Created user: ${response.data.username}`);
            setUsername("");
            setPassword("");
        }
        catch (error) {
            console.error('There was an error saving the data!', error);
            setMessage('Error saving data! ' + error);
        }
    };

    return (
        <div>
            <h2>Save Data to SQL Database</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                </div>
                <button type="submit">Save Data</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default MyAccount;
