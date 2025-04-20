import React, { useState, useEffect } from 'react';
import './App.css';

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

    // Simulate Krishna's response
    const krishnaMessage = "I am here, yet the universe resists my words. Try again, dear soul.";
    
    setConversation([...newConversation, { sender: 'krishna', message: krishnaMessage }]);
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
