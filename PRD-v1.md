---
repo: mcp-forge
rank: 6
score: 0.76
sprint: 1
substrate_anchor: MCP
build_estimate: "1–2 weeks for v0.1 (smallest viable build in the portfolio)"
status: planned
---

# PRD v1.0 — mcp-forge

> **One-liner:** Opinionated CLI to scaffold, test, and publish MCP servers. From zero to published server in under 5 minutes.
>
> **Substrate:** Anyone building MCP servers; also teams adopting MCP internally
> **Launch channels:** MCP Discord, r/ClaudeAI, AI Twitter, HN, Anthropic forums
> **Build estimate (v0.1):** 1–2 weeks for v0.1 (smallest viable build in the portfolio)

---

## What problem does this solve

Building an MCP server today involves either copy-pasting from the SDK README or doing it from scratch. There's no opinionated scaffolder with quality templates, test harness wiring, and publishing flow. mcp-forge is `cargo new` for MCP.

## Why this is a shovel and not a product

MCP is exploding. Server builders are a dense, named substrate. Smallest buildable shovel in the portfolio (a week of focused work). Hedge against Anthropic shipping their own scaffolder by being faster and broader.

---

## v0.1 — what ships

CLI: `mcp-forge new <name>` scaffolds a TS or Python MCP server with templates for common patterns (read-only API wrapper, file-based tool, database-backed). Built-in test harness. Publish flow to npm/PyPI with sane defaults.

### Acceptance criteria for v0.1

A v0.1 release is publishable to GitHub when ALL of these are true:

- [ ] Core functionality described above works on the primary developer machine.
- [ ] At least one local-only configuration is documented and tested (no cloud required).
- [ ] BYO endpoint / BYO key configuration is documented.
- [ ] README explains: what it is, who it's for, how to install, how to configure, what it doesn't do.
- [ ] LICENSE present (Apache 2.0 unless overridden).
- [ ] No hardcoded keys or vendor URLs anywhere.
- [ ] No telemetry / phone-home.
- [ ] At least one passing test for the main code path.
- [ ] CI green.
- [ ] AGENTS.md compliance reviewed.

## v0.5 — first major evolution

Templates for advanced patterns (streaming, sampling, prompts). Server validator. Migration tooling between SDK versions.

## v1.0 — fuller scope

Server registry integration. Marketplace publish. Multi-language support (Go, Rust).

---

## Architecture sketch

### Stack

TS CLI (Node 20+). Templates as first-class repo entities. Test harness uses the official MCP test tooling.

### Provider abstraction

The shovel MUST expose a provider abstraction even if v0.1 only uses one
provider. Suggested shape:

```
interface Provider {
  name: string;
  endpoint: URL;
  apiKeyEnvVar: string;
  call(input: ProviderInput): Promise<ProviderOutput>;
}
```

The default config in v0.1 must point to a free, local provider where
applicable, and document how to swap in any other.

### Configuration

Configuration order of precedence (highest to lowest):

1. Command-line flags
2. Environment variables (prefix: `MCP_FORGE_*`)
3. User config file (`~/.config/mcp-forge/config.toml` on Linux/Mac, equivalent on Windows)
4. Default config (shipped, but never with secrets)

---

## Anti-scope (do NOT build)

Not a hosted MCP platform. Not a billing/auth layer. Pure dev tooling.

---

## Tombstone risk and mitigation

**Risk:** Anthropic shipping `create-mcp-server` with quality templates. Medium probability — they have a basic version. Hedge: ship faster and wider, accept absorption window.

**Mitigation:** Ship fast (v0.1 in 1–2 weeks for v0.1 (smallest viable build in the portfolio)). Build community early
(launch on MCP Discord, r/ClaudeAI, AI Twitter, HN, Anthropic forums). Even if upstream absorbs the feature, accumulated
stars and the community are the audience-build payoff.

**Kill signal:** Anthropic's official scaffolder reaching feature parity. Monitor their releases.

If the kill signal triggers, the maintainer must announce within one week and
either (a) refocus on a remaining gap, (b) merge gracefully into upstream if
they're receptive, or (c) mark the repo as archived with a clear pointer to the
replacement.

---

## Launch plan

### Pre-launch checklist

- [ ] Repo on GitHub at `github.com/sovereign-shovels/mcp-forge`
- [ ] README polished (see template in `_templates/`)
- [ ] At least 3 issues / discussions seeded (real ones, not placeholder)
- [ ] LICENSE, CODE_OF_CONDUCT, CONTRIBUTING present
- [ ] Demo asset (gif, screenshot, or short video — depending on category)
- [ ] First-launch post drafted for primary launch channel

### Day-1 launch

Post to: MCP Discord, r/ClaudeAI, AI Twitter, HN, Anthropic forums

Subject template (adjust per channel):
- Show HN: `Show HN: mcp-forge – Opinionated CLI to scaffold, test, and publish MCP servers. From zero to published server in under 5 minutes.`
- Reddit: `[OSS] Opinionated CLI to scaffold, test, and publish MCP servers. From zero to published server in under 5 minutes.` with full post explaining the gap and the build
- Twitter/X: thread leading with the demo gif

### Week-1 follow-up

- Respond to every issue and comment within 24h.
- Ship at least one bugfix release based on launch feedback.
- Cross-post to secondary channels.

### Month-1 review

- Assess star velocity and community formation.
- If kill signal triggered, follow tombstone protocol above.
- If trajectory is healthy, plan v0.5.

---

## Cross-references

- Constitution: [[AGENTS]]
- Public README: [[README]]
- Progress frontmatter: [[progress]]
- Internal knowledge graph: [[knowledge-graph]]
