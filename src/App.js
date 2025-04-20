import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  // Load conversation from localStorage
  useEffect(() => {
    const storedConversation = JSON.parse(localStorage.getItem('conversation'));
    if (storedConversation) {
      setConversation(storedConversation);
    }
  }, []);

  // Save conversation to localStorage
  useEffect(() => {
    if (conversation.length) {
      localStorage.setItem('conversation', JSON.stringify(conversation));
    }
  }, [conversation]);

  // Function to handle sending a message
  const handleSend = async () => {
    if (!message.trim()) return;

    const newConversation = [...conversation, { sender: 'user', message }];
    setConversation(newConversation);
    setMessage('');

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY',
        {
          contents: [
            {
              parts: [
                {
                  text: `You are Lord Krishna, the divine guide from the Bhagavad Gita. Speak with wisdom, love, and eternal knowledge. Answer the following as Krishna himself: \n\nUser: ${message}\n\nKrishna:`
                }
              ]
            }
          ],
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ]
        }
      );

      console.log('API Response:', response.data);
      
      const krishnaMessage =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "The Lord's wisdom is vast, yet silence prevails. Try again, dear one.";

      setConversation([...newConversation, { sender: 'krishna', message: krishnaMessage }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setConversation([...newConversation, { sender: 'krishna', message: "I am here, yet the universe resists my words. Try again, dear soul." }]);
    }
  };

  // Function to clear conversation
  const handleClearConversation = () => {
    setConversation([]);
    localStorage.removeItem('conversation');
  };

  return (
    <div className="app">
      <header>
        <h1>Ask Krishna</h1>
      </header>

      {/* Show messages directly on the screen */}
      {conversation.map((entry, index) => (
        <div key={index} className={entry.sender === 'user' ? 'user-message' : 'krishna-message'}>
          {entry.message}
        </div>
      ))}

      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Krishna..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
        <button onClick={handleClearConversation} className="clear-btn">Clear</button>
      </div>
    </div>
  );
};

export default App;
