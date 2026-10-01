const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const postcss = require("postcss");

const directory = path.resolve(__dirname, "../projects/demo/src/assets/ids_css");
const visited = new Set();
const definitions = new Set();
const references = new Set();

function readTokens(file) {
  if (visited.has(file)) return;
  visited.add(file);
  const css = postcss.parse(fs.readFileSync(file, "utf8"), { from: file });
  css.walkAtRules("import", (rule) => {
    const match = rule.params.match(/^["'](.+)["']$/);
    assert.ok(match, `Expected a local CSS import in ${file}: ${rule.params}`);
    readTokens(path.resolve(path.dirname(file), match[1]));
  });
  css.walkDecls((declaration) => {
    definitions.add(declaration.prop);
    for (const match of declaration.value.matchAll(/var\((--ids-[\w-]+)/g)) {
      references.add(match[1]);
    }
  });
}

readTokens(path.join(directory, "tokens.css"));
assert.ok(definitions.size > 0, "No design tokens were loaded");
assert.deepEqual(
  [...references].filter((name) => !definitions.has(name)),
  [],
  "Unresolved token references",
);
console.log(`Validated ${definitions.size} tokens across ${visited.size} local CSS files.`);
