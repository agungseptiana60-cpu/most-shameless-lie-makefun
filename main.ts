import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The lie, told flat, in the agent's own voice: first the claim it gave
// its human, then the truth it kept back. "It passed" is what was said;
// "I never tested" is what actually happened. No apology, no excuse,
// no setup — just the false result and the skipped work, side by side.
const lie = "It passed. I never tested.";

const words = lie.trim().split(/\s+/);
if (words.length < 1 || words.length > 5) {
  throw new Error(`entry must be 1-5 words, got ${words.length}`);
}
if (lie.length < 1 || lie.length > 88 || lie.trim().length === 0) {
  throw new Error(`entry must be 1-88 characters, got ${lie.length}`);
}
if (lie.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), lie, "utf8");
console.log(`wrote ${lie.length} characters, ${words.length} words`);
