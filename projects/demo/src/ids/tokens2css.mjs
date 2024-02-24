import { readFileSync, writeFileSync } from "fs";

const defs = [
  "base",
  "smc-colors",
  "smc-colors-dark",
  "smc-reference",
  "comp-size-comfortable",
  "comp-size-compact",
  "comp-size-spacious",
  "comp",
];
for (const def of defs) {
  const _base = JSON.parse(readFileSync(`./${def}.json`, "utf-8"));

  const base = _base[Object.keys(_base)[0]];
  const root = [":root {"];

  function flattenObject(obj, prefix = "") {
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null) {
        flattenObject(value, newKey);
      } else {
        if (newKey.includes(".value")) {
          root.push(
            `  ${newKey
              .replace(".value", "")
              .replaceAll(".", "-")
              .toLowerCase()}: ${
              String(value).includes("{")
                ? `var(--ids-${String(value)
                    .replace(/\{(.*)\}/gi, (match, p1) => {
                      return p1;
                    })
                    .replaceAll(".", "-")
                    .toLowerCase()})`
                : value
            };`
          );
        }
      }
    }
  }
  flattenObject(base, `--ids-${['smc-reference', 'smc-colors', 'smc-colors-dark'].includes(def) ? 'smc' : def}`);

  root.push("}");

  writeFileSync(`${def}.css`, root.join("\n"));
}
