import { writeFileSync, mkdirSync, existsSync } from "fs";

const API_KEY = "sk_f830ce7ca45e701cb95eed3526278996fb42ffba13bd5979";
const voiceId = "VCGhAh0uUPumdTXQNdzQ"; // Adam voice

const fullText = "Hi, I'm Erixon, a passionate Full-Stack Developer. I love building seamless experiences with modern technologies like React, Node, and Tailwind. Check out some of my featured work, including a full stack ecommerce platform! Let's build something amazing together.";

async function run() {
  const dir = "public/voiceover";
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  console.log("Generating full continuous voiceover...");
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: fullText,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.4,
        },
      }),
    },
  );

  if (!response.ok) {
    console.error(`Failed to generate: ${response.statusText}`);
    const text = await response.text();
    console.error(text);
    return;
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(`${dir}/full.mp3`, audioBuffer);
  console.log("Saved full.mp3");
}

run();
