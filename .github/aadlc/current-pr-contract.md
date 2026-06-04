# Current PR Contract

## Status

Phase 05 documentation is in progress.

## Scope

Refresh repository documentation so usage examples and output-format guidance match the current CLI behaviour.

## Intended approach

- Identify where the README still describes outdated command entrypoints or incomplete output behaviour.
- Update runnable usage examples to use the current built CLI flow.
- Document the `--format` contract, including the JSON payload behaviour for interactive commands.
- Update AADLC artefacts only where the documentation phase needs the governance record to stay aligned.

## Risks

- README command examples can drift from the actual runnable entrypoint if they rely on the wrong script.
- Output format documentation can become misleading if it does not mention interactive prompt behaviour.
- AADLC artefacts can become inconsistent if they still describe the earlier feature phase instead of the docs phase.

## Assumptions

- Existing CLI behaviour is already the source of truth; this phase only documents it.
- The built `bin/run` entrypoint is the safest basis for runnable README examples.
- JSON examples should describe stable fields without depending on environment-specific values such as memory totals.

## Hard rules

- Do not inspect other benchmark repositories.
- Do not use results from other model runs.
- Do not change benchmark prompts.
- Do not change benchmark scoring templates.
- Preserve existing behaviour unless the phase explicitly requires a change.
- Keep diffs minimal and reviewable.
- Run available validation commands where possible.
- Update AADLC artifacts only when the phase requires it.
