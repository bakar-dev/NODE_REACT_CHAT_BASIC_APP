import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";

import "./Chat.css";

import TextContainer from "../TextContainer/TextContainer";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;

export default function Chat({ location }) {
  const ENDPOINT = "localhost:5000";
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingMsg, setTypingMessage] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.Off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    socket.on("typingMessage", msg => {
      setTypingMessage(msg);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  //send Message function
  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const typing = e => {
    socket.emit("typing");
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} name={name} />
        <Messages messages={messages} name={name} />
        {typingMsg.text}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          typing={typing}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
}
