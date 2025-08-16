// assistant.js
import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // <-- Put your key in .env
});

// STEP 1: Read error from error.txt
const errorLog = fs.readFileSync("error.txt", "utf8");

// STEP 2: Ask AI to debug
const runAssistant = async () => {
  console.log("🤖 Reading error log...\n");
  console.log(errorLog);

  console.log("\n🔍 Asking AI assistant to debug...\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // lightweight + fast
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant that fixes Trigger.dev and Node.js code errors. Always explain in plain English and provide corrected code.",
      },
      {
        role: "user",
        content: `Here is my error:\n\n${errorLog}\n\nPlease explain the bug and give fixed code.`,
      },
    ],
  });

  // STEP 3: Show the response
  const aiMessage = response.choices[0].message.content;
  console.log("✅ AI Assistant Response:\n");
  console.log(aiMessage);
};

runAssistant();
