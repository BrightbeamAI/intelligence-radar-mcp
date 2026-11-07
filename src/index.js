#!/usr/bin/env node
// The Intelligence Radar MCP server over stdio. Hosts start it as a child process. Reading the Radar needs no network;
// connected to GitHub (sign_in_with_github, or RADAR_GITHUB_TOKEN), the contribution and review tools work on GitHub (github.js).
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { createServer } from './server.js';
import { connectGitHub } from './github.js';
import { R, ED } from './data.js';

const arg = process.argv[2];
if (arg === '--version' || arg === '-v') {
  process.stdout.write(`${R.version} (${ED.title}, ${ED.label})\n`);
  process.exit(0);
}
if (arg === '--help' || arg === '-h') {
  process.stdout.write([
    `${ED.title} MCP server ${R.version}: ${ED.label}, ${ED.volume}: ${ED.edition_title}.`,
    '',
    'Any AI tool or agent that loads MCP servers starts this program and talks to it over stdio. Give it:',
    '',
    '  command "npx", args ["-y", "@brightbeamai/intelligence-radar-mcp"]',
    '',
    'For example:  claude mcp add intelligence-radar -- npx -y @brightbeamai/intelligence-radar-mcp',
    '              codex mcp add intelligence-radar -- npx -y @brightbeamai/intelligence-radar-mcp',
    `Apps that install MCP Bundles, such as Claude Desktop, can open ${ED.site_url}downloads/the-intelligence-radar.mcpb.`,
    `Setup for each host: ${ED.site_url}ai-tools.html`,
    '',
    'To contribute or review from your AI tool, ask it to sign in with GitHub (the sign_in_with_github tool), or set',
    'RADAR_GITHUB_TOKEN to a GitHub token that can open issues and comment on the contributions repository. Without either,',
    'contributions become pre-filled GitHub issues to open by hand.',
    '',
  ].join('\n'));
  process.exit(0);
}

// With a token, ask GitHub whom it belongs to and the list of people for their role (3 seconds at most) while the connection
// opens: the role decides the reviewer tools
const gh = connectGitHub();
const handle = serveStdio(async () => createServer(await gh));
const stop = () => { handle.close().finally(() => process.exit(0)); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
console.error(`${ED.title} MCP server ${R.version} (${ED.label}) is ready on stdio.`);
gh.then((g) => {
  if (g.login) console.error(`Connected to GitHub as @${g.login}${g.role ? `, ${g.role} on the list of people` : ', not on the list of people'}.`);
  else if (g.problem) console.error(g.problem);
});
