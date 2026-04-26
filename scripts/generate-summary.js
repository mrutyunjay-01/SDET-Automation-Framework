const fs = require("fs");

const path = "test-results/results.json";

if (!fs.existsSync(path)) {
    console.log("No results.json found");
    process.exit(0);
}

const data = JSON.parse(fs.readFileSync(path, "utf8"));

let passed = 0;
let failed = 0;
let skipped = 0;

function walk(suite) {
    if (!suite) return;

    if (suite.specs) {
        suite.specs.forEach(spec => {
            spec.tests.forEach(test => {
                test.results.forEach(result => {
                    if (result.status === "passed") passed++;
                    if (result.status === "failed") failed++;
                    if (result.status === "skipped") skipped++;
                });
            });
        });
    }

    if (suite.suites) suite.suites.forEach(walk);
}

walk(data.suites?.[0]);

const total = passed + failed + skipped;

const status = failed > 0
    ? "🔴 FAILURES DETECTED"
    : "🟢 ALL TESTS PASSED";

const summary = `
## 🎭 Playwright Test Summary

### ${status}

| Metric | Count |
|---|---|
| Total | ${total} |
| Passed | ${passed} |
| Failed | ${failed} |
| Skipped | ${skipped} |
`;

fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);