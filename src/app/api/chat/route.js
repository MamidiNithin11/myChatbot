import axios from "axios";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen3-30b-a3b-instruct-2507",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;

    return new Response(JSON.stringify({ reply: aiReply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "AI Error:",
      error.response?.data || error.message || "Unknown error"
    );
    return new Response(
      JSON.stringify({ reply: "Error contacting AI service." }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
