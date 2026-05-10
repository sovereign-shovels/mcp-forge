# mcp-forge

> Opinionated CLI to scaffold, test, and publish MCP servers. From zero to published server in under 5 minutes.

**Status:** v0.1 — building.

**Sovereignty:** sovereign-by-construction. BYO endpoint, BYO key, BYO model.
A local-only configuration is documented and tested.

This is a community project, **not affiliated with MCP**.
Best-effort community shovel — no SLA, no roadmap commitments.

---

## What this is

`cargo new` for MCP servers. One command scaffolds a working TypeScript or Python MCP server with:

- Quality templates for common patterns (read-only API, file tool, database tool)
- Built-in test harness
- Publish flow to npm/PyPI with sane defaults

## What this isn't

Not a hosted MCP platform. Not a billing or auth layer. Not a marketplace. Pure dev tooling.

## Install

```bash
npm install -g mcp-forge
```

Or use without installing:

```bash
npx mcp-forge new my-server
```

## Quick start

```bash
# Scaffold a TypeScript file-tool server
mcp-forge new my-server --lang typescript --template file-tool

# Scaffold a Python read-only API server
mcp-forge new my-api --lang python --template read-only-api

# Test the generated server
mcp-forge test my-server

# List all templates
mcp-forge templates
```

## Templates

| Template | Description | Best for |
|---|---|---|
| `read-only-api` | Wraps a REST API as MCP tools | Weather, search, data APIs |
| `file-tool` | Reads/writes/lists files in a directory | Document processing, logs |
| `db-tool` | Queries a SQLite database | Analytics, structured data |

## Configure

You bring the model. By default `mcp-forge` tries to use a local provider:

- For LLM endpoints: Ollama at `http://localhost:11434`

To use any other provider (Claude, GPT, Hermes, OpenRouter, Sarvam, etc.):

```toml
# ~/.config/mcp-forge/config.toml
[provider]
endpoint = "https://api.your-provider.com/v1"
api_key_env = "YOUR_PROVIDER_KEY"
model = "your-model-name"
```

Anthropic, OpenAI, and Sarvam endpoints all work. Local Ollama, llama.cpp,
LM Studio, and vLLM all work via their OpenAI-compatible endpoints.

## Why this exists

Building an MCP server today involves either copy-pasting from the SDK README or doing it from scratch. There's no opinionated scaffolder with quality templates, test harness wiring, and publishing flow. mcp-forge is `cargo new` for MCP.

## Commands

```
mcp-forge new <name>      Scaffold a new MCP server
mcp-forge test <path>     Run test harness on a generated server
mcp-forge templates       List available templates
mcp-forge publish <path>  Prepare for npm/PyPI publish (dry-run)
```

## What's next

See [PRD-v1.md](./PRD-v1.md) for the full v0.1 → v0.5 → v1.0 plan.

## License

Apache 2.0. See [LICENSE](./LICENSE).

## Part of sovereign-shovels

This repo is part of the [sovereign-shovels](https://github.com/sovereign-shovels)
portfolio of small, focused, sovereign-by-construction AI utilities.

Other shovels: claude-vault, bulbul-studio, saaras-tray, claude-prompts,
ollama-cron, mcp-forge, sarvam-pdf, agent-console, sarvam-meet, obsidian-llm,
llm-diff, claude-bridge, claude-radio, sarvam-cast.
