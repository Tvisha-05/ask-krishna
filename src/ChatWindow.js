import React from 'react';

const ChatWindow = ({ conversation }) => {
    return (
      <div className="chat-window">
        {conversation.map((entry, index) => (
          <div key={index} className={entry.sender === 'user' ? 'user-message' : 'krishna-message'}>
            {entry.message}
          </div>
        ))}
      </div>
    );
  };
  

export default ChatWindow;
