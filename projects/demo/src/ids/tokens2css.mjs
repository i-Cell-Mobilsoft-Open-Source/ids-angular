import { readFileSync, writeFileSync } from "fs";

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
const tokensRaw = JSON.parse(readFileSync(`./tokens.json`, "utf-8"));
const root = [":root {"];
flattenObject(tokensRaw, "--ids");
root.push("}");
writeFileSync(
  `tokens.css`,
  root
    .join("\n")
    .replaceAll("ids-component", "ids-comp")
    .replaceAll("no icon", "no-icon")
    .replaceAll("colors-colors", "colors")
);
