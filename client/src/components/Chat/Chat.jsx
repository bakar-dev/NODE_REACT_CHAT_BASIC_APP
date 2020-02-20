import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";

import "./Chat.css";

let socket;

export default function Chat({ location }) {
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    socket.emit("join", { name, room });

    return () => {
      socket.emit("disconnect");
      socket.Off();
    };
  }, [ENDPOINT]);

  return <div>Chat</div>;
}
