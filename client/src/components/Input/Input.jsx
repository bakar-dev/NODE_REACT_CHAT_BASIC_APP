import React from "react";

import "./Input.css";

const Input = ({ setMessage, sendMessage, message, typing }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event =>
        event.key === "Enter" ? sendMessage(event) : typing(event)
      }
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
