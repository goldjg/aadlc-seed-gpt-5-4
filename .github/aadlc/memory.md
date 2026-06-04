<!-- version: 1.0.0 -->

Durable Architectural Truth Cache

This cache stores durable project truths that should persist beyond a
single task. Update it only when a stable fact, decision, invariant, or
unresolved question should carry forward.

Project purpose

This repository combines a TypeScript CLI starter application with
AADLC governance artefacts and benchmark materials.

The shipped application is a Node.js CLI that demonstrates command
registration, interactive prompting, logging, scaffolding, and standard
TypeScript build/test tooling.

Benchmark prompts and AADLC files govern how changes are evaluated, but
the application code remains the CLI starter in `bin/` and `src/`.

Non-goals

- It is not a web service or long-running daemon.
- It does not implement authentication or authorization flows.
- It does not persist domain data or run a database.
- It does not consume benchmark result files as application inputs.
- It does not vendor scaffold templates locally; the `create` command
  downloads them on demand.

Architecture summary

`bin/run.ts` is the CLI entrypoint. It loads `dotenv`, creates the
`yargs` runner, registers every exported command, and requires at least
one subcommand.

`src/commands/index.ts` is the centralized command registry for the
sample commands: `info`, `greeting`, and `create`. `src/index.ts`
re-exports that registry for the entrypoint.

`src/logger.ts` creates the shared `consola` logger used for logging and
interactive prompts.

`tsup.config.ts` builds `bin/run.ts` into `dist/run.js`, and `bin/run`
delegates execution to that built file.

`jest.config.js` uses `ts-jest` and ignores `dist/`, so tests exercise
source files rather than generated output.

AADLC governance artefacts live in `.github/aadlc/`, and benchmark phase
prompts live in `benchmark/prompts/`.

Core invariants

- CLI startup loads environment variables before command execution.
- Command registration is centralized through `src/commands/index.ts`.
- The CLI requires at least one command before running.
- The `create` command normalizes relative target paths against
  `process.cwd()`.
- The `create` command crosses a network trust boundary by downloading
  `gh:kucherenko/cli-typescript-starter` with `giget`.
- The `greeting` and `create` commands are interactive and depend on TTY
  prompts through `consola`.
- The `info` command defaults `--full` to `true` and logs process config
  when enabled.
- `dist/` is generated build output and not the source of truth.
- Benchmark prompts define the benchmark phases and should remain stable
  during measured runs.

Benchmark integrity rules

- Do not modify files in `benchmark/prompts/` during a measured run.
- Do not import findings from other benchmark repositories or runs.
- Keep AADLC artefact updates grounded in the checked-in repository
  state.
- Treat validation output as higher confidence than assumptions about
  CLI behaviour.

Trust boundaries

- The active task prompt and `.github/aadlc/current-pr-contract.md`
  define allowed change scope.
- Repository files are the source of truth for code, tooling, and
  governance state.
- CLI arguments, prompt answers, environment variables, filesystem
  targets, and remote template content are external inputs.
- Human review remains the final authority for benchmark acceptance.

Known sharp edges

- Automated test coverage is unit-level and does not exercise the full CLI
  entrypoint end to end.
- `create` can write to any absolute or cwd-relative path chosen by the
  operator.
- `corepack pnpm lint` succeeds but emits a warning because
  `@typescript-eslint` does not officially support the pinned
  TypeScript 5.4.5 version.

Field findings

- The benchmark instructions reference `benchmark/playbook.md`, but the
  checked-in benchmark playbook currently lives at
  `benchmark/benchmark.md`.

Canonical validation commands

- `corepack pnpm lint`
- `corepack pnpm test`
- `corepack pnpm build`

Current operating assumptions

- Development and validation are expected to run through pnpm-managed
  scripts defined in `package.json`.
- Husky hooks run repository checks through `corepack pnpm`, and
  `commit-msg` validates conventional commits with `commitlint --edit`.
- TypeScript targets Node 20 settings via `@tsconfig/node20`.
- Release automation is configured through `semantic-release` branch
  rules and depends on external secret provisioning.

Open questions

- Should automated tests cover the full CLI entrypoint end to end in
  addition to the current unit coverage?

Last updated

2026-06-04 by Copilot
