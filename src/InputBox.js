import React from 'react';

const InputBox = ({ message, setMessage, handleSend }) => {
  return (
    <div className="input-area">
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Ask Krishna..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default InputBox;
