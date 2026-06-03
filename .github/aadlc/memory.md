<!-- version: 1.0.0 -->

Durable Architectural Truth Cache

This cache stores durable project truths that should persist beyond a
single task. Update it only when a stable fact, decision, invariant, or
unresolved question should carry forward.

Project purpose

This repository is a controlled benchmark environment used to evaluate
coding-model performance within an AADLC-governed software development
workflow.

The repository is derived from a TypeScript CLI starter project and is
used to compare cost, quality, validation outcomes, steering effort,
artifact quality, and credit consumption across multiple coding models.

The benchmark measures useful engineering work performed within a
governed workflow rather than raw model capability in isolation.

Non-goals

* Determining universal model superiority.
* Comparing models outside the scope of this repository.
* Measuring general intelligence.
* Optimising benchmark tasks for a specific model.
* Importing learnings from other benchmark runs during an active run.
* Using benchmark results as proof of performance on unrelated projects.

Architecture summary

This repository is based on a TypeScript CLI starter application.

AADLC governance artefacts are stored in .github/aadlc/.

Benchmark definitions, prompts, and run records are stored in
benchmark/.

Application source code remains within the original project structure
provided by the seed repository.

Benchmark tasks should preserve architectural consistency unless a phase
explicitly requires a change.

Core invariants

* All benchmark runs must start from the same seed commit.
* Benchmark prompts are part of the benchmark definition and must not be
    modified during a run.
* Results from other benchmark repositories must not be imported.
* Durable memory should capture repository truths rather than session
    history.
* Existing behaviour should not change unless required by the active
    benchmark phase.
* Validation results take precedence over model confidence.
* Keep diffs minimal, reviewable, and aligned to the active PR contract.
* AADLC artefacts should reduce semantic rediscovery without becoming a
    per-session diary.

Benchmark integrity rules

* Do not inspect other benchmark repositories.
* Do not import findings from other model runs.
* Do not compare benchmark outcomes until a run is complete.
* Benchmark scoring is performed by the human operator.
* Credit usage measurements are authoritative even if they contradict
    model assumptions.

Trust boundaries

* The benchmark prompts define the permitted scope of work.
* The active PR contract defines the permitted change boundary.
* Human review is the final authority on acceptance.
* Validation commands are the primary source of behavioural truth.
* External repositories, benchmark runs, blog posts, discussions, and
    model outputs are out of scope unless explicitly introduced into this
    repository.

Known sharp edges

* Long repository hydration phases can consume significant model effort
    before useful work begins.
* Models may over-anchor on previous instructions or generated
    artefacts.
* Validation success does not automatically imply contract compliance.
* Excessive corrective prompting is a failure signal and should be
    recorded as steering effort.
* Different models may produce materially different solutions to the
    same task.

Field findings

<!-- Populate with durable findings discovered during benchmark runs. -->

Canonical validation commands

<!-- Populate with validated commands that prove expected behaviour in this repository. -->

Current operating assumptions

* Model availability is not a stable invariant.
* The benchmark playbook remains the source of truth for benchmark
    execution.
* The active PR contract remains the source of truth for the current
    phase.
* Useful work should be evaluated in conjunction with cost, quality, and
    steering effort.

Open questions

* Which benchmark phases consume the greatest proportion of credits?
* Which models require the least steering effort?
* Which models produce the most maintainable artefacts?
* Does AADLC reduce total credit consumption while maintaining quality?
* Which model delivers the best cost-to-validated-work ratio?

Last updated

2026-06-03 by benchmark scaffold