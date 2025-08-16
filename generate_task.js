// generate_task.js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const prompt = process.argv.slice(2).join(" ");
  if (!prompt) {
    console.error("Usage: node generate_task.js \"<prompt>\"");
    process.exit(1);
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an AI that writes valid Trigger.dev Node.js workflows." },
      { role: "user", content: `Write raw code for this task: ${prompt}` }
    ]
  });

  console.log("🤖 AI Generated Code:");
  console.log(completion.choices[0].message.content);
}

run();
