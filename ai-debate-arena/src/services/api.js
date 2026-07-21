import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function streamDebate(
  { topic, rounds },
  onEvent,
  signal
) {
  const response = await fetch(`${BASE_URL}/debate/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      rounds,
    }),
    signal, // 👈 Added
  });

  if (!response.ok) {
    throw new Error("Unable to connect to backend.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value);

      const events = buffer.split("\n\n");
      buffer = events.pop();

      for (const event of events) {
        if (!event.startsWith("data:")) continue;

        const json = event.replace("data:", "").trim();

        onEvent(JSON.parse(json));
      }
    }
  } catch (err) {
    if (err.name !== "AbortError") {
      throw err;
    }
  } finally {
    reader.releaseLock();
  }
}

export default axios.create({
  baseURL: BASE_URL,
});