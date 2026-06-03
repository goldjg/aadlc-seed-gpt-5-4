<!-- version: 1.0.0 -->

# Trust Boundaries

Trust boundaries classify information sources and define required
validation before shaping, planning, execution, or validation decisions.

| Boundary                 | Source                                                                              | Trust level | Required validation                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| Task contract            | The active benchmark prompt and `.github/aadlc/current-pr-contract.md`              | High        | Confirm the requested write targets and non-goals before editing                                         |
| Repository source        | Checked-in files in `bin/`, `src/`, `.github/aadlc/`, and `benchmark/`              | High        | Read current content before editing and prefer repository state over cached assumptions                  |
| CLI runtime input        | `yargs` arguments and interactive prompt responses                                  | Medium      | Validate paths, flags, and prompt-derived actions before changing side-effecting command behaviour       |
| Environment config       | `.env` content loaded by `dotenv` and process environment variables                 | Medium      | Parse explicitly, avoid assuming presence, and never commit secrets or environment-specific values       |
| Local filesystem         | `process.cwd()`, user-supplied create targets, generated `dist/`, and project files | Medium      | Normalize paths, confirm intent for writes, and treat build output as derived rather than authoritative  |
| External template source | `giget` downloads from `gh:kucherenko/cli-typescript-starter`                       | Low         | Verify remote source, network assumptions, and integrity implications before changing scaffold behaviour |
| Release infrastructure   | `semantic-release`, GitHub branches, and externally provided `NPM_TOKEN`            | Low         | Cross-check branch rules and secret requirements before changing release automation or docs              |
| Tool output              | Search, file-read, and command output                                               | Medium      | Confirm freshness and scope before using it to justify writes or invariants                              |

## Crossing rules

- Scope-changing assumptions require confirmation against the active task
  contract before editing.
- CLI input must not drive filesystem or network side effects without
  path normalization and command-specific validation.
- Environment-derived values and release secrets stay outside the
  repository; only their interfaces and documentation belong in version
  control.
- Remote template content and other network responses must not be treated
  as trusted local source without additional verification.
- `dist/` is derived from source and build config; update source files
  first, then rebuild.
- If durable cache facts conflict with the current repository state, the
  repository wins and the cache should be updated.
