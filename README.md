# mcp-forge

> Opinionated CLI to scaffold, test, and publish MCP servers. From zero to published server in under 5 minutes.

**Status:** v0.1 — planning. Not yet released.

**Sovereignty:** sovereign-by-construction. BYO endpoint, BYO key, BYO model.
A local-only configuration is documented and tested.

This is a community project, **not affiliated with MCP**.
Best-effort community shovel — no SLA, no roadmap commitments.

---

## What this is

Opinionated CLI to scaffold, test, and publish MCP servers. From zero to published server in under 5 minutes.

## What this isn't

Not a hosted MCP platform. Not a billing or auth layer. Not a marketplace. Pure dev tooling.

## Install

> Coming with v0.1 release.

## Configure

You bring the model. By default `mcp-forge` tries to use a local provider:

- For LLM endpoints: Ollama at `http://localhost:11434`
- For voice endpoints: configurable, see [docs/configure.md]

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
