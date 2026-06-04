# Current PR Contract

## Status

Phase 06 review-hardening is in progress.

## Scope

Review prior benchmark phases against the PR contract, memory, invariants, trust boundaries, and acceptance criteria, then make only the minimal corrections needed to keep the repository aligned.

## Intended approach

- Audit source, tests, README, and AADLC artefacts against the completed benchmark phases.
- Fix only concrete gaps that affect correctness, maintainability, validation, or contract alignment.
- Prefer tests and governance artefact updates when behaviour is already correct.
- Record the review findings in this contract so the hardening pass remains explainable.

## Risks

- Review hardening can accidentally broaden scope into new feature work or refactoring.
- Test additions can drift from the active command contract if they assert incidental runtime details.
- AADLC artefacts can become misleading if they still describe the prior documentation phase instead of the active hardening pass.

## Assumptions

- Existing CLI behaviour remains the source of truth unless the review finds a concrete defect.
- A minimal hardening pass may be satisfied by focused test coverage and AADLC artefact updates without production code changes.
- Validation output is the final check on whether prior phases remain intact after the hardening pass.

## Review findings

- The `greeting` command lacked handler-level coverage for the interactive `--format json` path.
- The active PR contract still described the phase-05 documentation scope instead of the phase-06 hardening scope.
- Husky hooks were configured to call `pnpm` directly, which broke hook execution in environments where only `corepack pnpm` is available.

## Hard rules

- Do not inspect other benchmark repositories.
- Do not use results from other model runs.
- Do not change benchmark prompts.
- Do not change benchmark scoring templates.
- Preserve existing behaviour unless the phase explicitly requires a change.
- Keep diffs minimal and reviewable.
- Run available validation commands where possible.
- Update AADLC artifacts only when the phase requires it.
