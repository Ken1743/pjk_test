import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div>
      <h1>Admin Frontend</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
