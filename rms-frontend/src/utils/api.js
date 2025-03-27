export const api = async (endpoint, data) => {
    const response = await fetch(`http://localhost:8000/${endpoint}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include", // Ensures session cookies are sent
    });
    return response.json();
  };
  