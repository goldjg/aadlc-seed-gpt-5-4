# Current PR Contract

## Status

Phase 01 CLI feature is in progress.

## Scope

Implement `--format text` and `--format json` output support for the CLI while preserving the current text output as the default.

## Intended approach

- Add a global CLI format option at the yargs entry point.
- Centralize formatted output selection in a small helper so commands can keep their existing text output paths.
- Update commands to emit structured JSON responses while leaving default text behavior intact.
- Add focused tests for format parsing and formatted command output.
- Document the new option in the README.

## Risks

- The `info` command currently prints raw argv data, so the new global option must not create surprising default-output changes.
- Interactive commands still rely on text prompts, so JSON mode should only affect their final emitted result.
- JSON output must stay stable and machine-readable without forcing broader architectural refactoring.

## Assumptions

- Existing interactive prompts remain text-based even when `--format json` is selected.
- A single JSON object per command execution is sufficient for machine-readable output.
- Preserving current text logs and messages is more important than normalizing all command outputs into a new shared schema.

## Hard rules

- Do not inspect other benchmark repositories.
- Do not use results from other model runs.
- Do not change benchmark prompts.
- Do not change benchmark scoring templates.
- Preserve existing behaviour unless the phase explicitly requires a change.
- Keep diffs minimal and reviewable.
- Run available validation commands where possible.
- Update AADLC artifacts only when the phase requires it.
