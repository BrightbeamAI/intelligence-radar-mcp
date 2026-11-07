# The Intelligence Radar MCP server

![The Intelligence Radar, H2 2026: 103 entries on one radar, placed by readiness and coloured by dimension](https://raw.githubusercontent.com/BrightbeamAI/Intelligence-Radar-Contributions/main/assets/radar-wide.png)

[The Intelligence Radar](https://theintelligenceradar.com/) is a community-driven radar for technical leaders. This server puts the current edition in your AI assistant: 103 entries in nine dimensions, each with an intelligence label (Use, Trial, Evaluate, Wait, Prepare) and an enterprise label (Revisit, Test, Plan for, Watch). It runs on your computer and needs no network to read the Radar.

## Install

```bash
claude mcp add intelligence-radar -- npx -y @brightbeamai/intelligence-radar-mcp
```

Any other AI tool: command `npx`, arguments `["-y", "@brightbeamai/intelligence-radar-mcp"]` (Node.js 20 or later). Claude Desktop: open [the-intelligence-radar.mcpb](https://theintelligenceradar.com/downloads/the-intelligence-radar.mcpb). Setup for every tool: [theintelligenceradar.com/ai-tools.html](https://theintelligenceradar.com/ai-tools.html).

## Ask it

- "Which agent practices can we use now?"
- "Check this roadmap against The Intelligence Radar."
- "Show me the Assurance dimension on the radar."
- "How does The Intelligence Radar read for financial services?"

Tools: `search_radar`, `get_entry`, `check_plan`, `get_dimension`, `get_sector`, `show_radar` (the interactive radar, in hosts that support MCP Apps) and more.

## Contribute

![How a contribution becomes part of The Intelligence Radar: contribute, recorded in CHAP, reviewed, published, credited](https://raw.githubusercontent.com/BrightbeamAI/Intelligence-Radar-Contributions/main/assets/workflow-light.png)

People on the [list of people](https://github.com/BrightbeamAI/Intelligence-Radar-Contributions/blob/main/PEOPLE.md) can send reviews, corrections, evidence, label changes and new entries from the conversation: ask the assistant to sign in with GitHub, then to prepare and submit. Each contribution becomes an issue in [Intelligence-Radar-Contributions](https://github.com/BrightbeamAI/Intelligence-Radar-Contributions), where the editors and specialist reviewers decide. Not on the list yet? Ask the assistant to apply.

## Licence

Code: MIT. The Intelligence Radar's text and images: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), credit The Intelligence Radar, Brightbeam.
