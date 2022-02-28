import React, { useEffect, useState } from "react";

const ChatApp = () => {
  const [isOnline, setIsOnline] = useState(true);

  function onOnline() {
    setIsOnline(true);
  }

  function onOffline() {
    setIsOnline(false);
  }

  useEffect(() => {
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [isOnline]);

  return (
    <div>
      {isOnline ? (
        <h1
          style={{
            color: "green",
            border: "3px dotted black",
            height: "50vh",
            margin: "20px",
          }}
        >
          Online
        </h1>
      ) : (
        <h1 style={{ color: "red" }}>Offline</h1>
      )}
    </div>
  );
};

export default ChatApp;
