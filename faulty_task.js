import "dotenv/config";
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example multiple faulty code snippets
const faultySnippets = [
  `
function add(a, b) {
  return a - b;
}
`,
  `
function isEven(n) {
  return n % 2 === 1; // Wrong logic
}
`,
  `
function multiply(a, b) {
  return a / b; // Wrong operation
}
`,
];

async function fixCode() {
  try {
    // Clear file before writing new fixes
    fs.writeFileSync("fixed_code.js", "// ✅ Fixed Code Snippets\n\n");

    for (let i = 0; i < faultySnippets.length; i++) {
      const faultyCode = faultySnippets[i];

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that fixes faulty JavaScript code. Only return the corrected code."
          },
          {
            role: "user",
            content: `Fix the following faulty code:\n\n${faultyCode}`
          }
        ]
      });

      const fixedCode = response.choices[0].message.content.trim();

      console.log(`\n🚨 Faulty Code #${i + 1}:\n${faultyCode}`);
      console.log(`\n✅ Fixed Code #${i + 1}:\n${fixedCode}`);

      // Append to file
      fs.appendFileSync("fixed_code.js", `// Fixed Code #${i + 1}\n${fixedCode}\n\n`);
    }

    console.log("\n📂 All fixed snippets have been saved to fixed_code.js ✅");

  } catch (error) {
    console.error("❌ Error fixing code:", error);
  }
}

fixCode();
