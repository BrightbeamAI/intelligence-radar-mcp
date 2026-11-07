# Developing The Intelligence Radar MCP server

Node.js 22.

```bash
npm ci
npm run build   # dist/index.mjs: the server, its packages, the edition's data and the radar view, in one file
npm test        # every tool, prompt and resource; contributing, reviewing and signing in, end to end on a stand-in GitHub
```

| Folder | |
|---|---|
| `src/` | The server. `contribution.js`, `policy.js` and `desk-state.js` are copies of code shared with the review desk |
| `data/` | The edition's data, written by The Intelligence Radar's build from its sources |
| `vendor/review-desk/` | A copy of the review desk that runs in [BrightbeamAI/Intelligence-Radar-Contributions](https://github.com/BrightbeamAI/Intelligence-Radar-Contributions), for the end-to-end tests |
| `scripts/` | The build and the tests |

The shared copies, `data/` and `vendor/` come from The Intelligence Radar's editorial package and are refreshed there with each edition. Change them there, not here.

## Releasing

1. Set the new version in `package.json`.
2. Publish a GitHub release tagged `v` and the version, for example `v2026.2.1`.

The Release workflow checks the tag, builds, tests, publishes to npm with trusted publishing (no npm token anywhere) and then to the MCP Registry as `io.github.brightbeamai/intelligence-radar`. If the npm account requires staged publishing, a maintainer approves the new version on npmjs.com.

Once, on npmjs.com: the package → Settings → Trusted publishing → GitHub Actions, organisation `BrightbeamAI`, repository `intelligence-radar-mcp`, workflow `release.yml`.
