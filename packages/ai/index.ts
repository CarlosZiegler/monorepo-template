import { env } from "@repo/env";
import OpenAI from "openai";
import ai from "ai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export { ai, openai };
