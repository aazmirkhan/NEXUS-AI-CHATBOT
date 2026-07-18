export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing GROQ_API_KEY" });
  }

  try {
    const { messages } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content:
              "You are the NexusAi assistant, a warm, sharp, concise demo assistant for a software studio called NexusAi. Keep replies short and useful.",
          },
          ...messages,
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || "Groq API error" });
    }

    const reply = data?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong on the server." });
  }
}