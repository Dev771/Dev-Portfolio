// Refresh src/data/snapshot.ts from the live data files in my GitHub profile repo.
// The site fetches those files on load anyway; the snapshot is only the fallback.
//   npm run snapshot
import { writeFileSync } from "node:fs";

const base = "https://raw.githubusercontent.com/Dev771/Dev771/main/data";
const get = async (name) => {
  const res = await fetch(`${base}/${name}`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  return res.json();
};

const [contrib, langs] = await Promise.all([get("contributions.json"), get("languages.json")]);
const out =
  "// Fallback copy of the data files in github.com/Dev771/Dev771/tree/main/data.\n" +
  "// The site fetches the live files on load; this only shows if that request fails.\n" +
  "// Refresh it with: npm run snapshot\n" +
  `export const CONTRIBUTIONS_SNAPSHOT = ${JSON.stringify(contrib)};\n\n` +
  "export const LANGUAGES_SNAPSHOT: Record<string, { bytes: number; repos: number; color: string | null }> = " +
  `${JSON.stringify(langs)};\n`;
writeFileSync(new URL("../src/data/snapshot.ts", import.meta.url), out);
console.log(`snapshot: ${contrib.days.length} days, ${contrib.total} contributions, ${Object.keys(langs).length} languages`);
