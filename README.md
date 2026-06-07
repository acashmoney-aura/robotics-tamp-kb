# Robotics TAMP Knowledge Base

A local-first KRAIL project for robotics task-and-motion planning research.

## Focus

- dual-arm task and motion planning
- task-motion-scheduling
- long-horizon manipulation failures
- PDDLStream and follow-on solvers
- Graphs of Convex Sets / IRIS / Drake
- behavior trees and execution/replanning
- practical benchmarks, packages, and project ideas

## Seeded on day 1

This repo was initialized with the KRAIL engine and seeded from Akash's June 6, 2026 research email plus a first pass of verified source captures.

## Good entry points

- `topics/brief.md`
- `specs/research_question.yaml`
- `research_plan/current_plan.md`
- `topics/notes/initial-systems-landscape.md`
- `topics/notes/benchmark-and-tooling-map.md`
- `topics/notes/llms-execution-and-applications.md`
- `research_plan/source_registry.md`
- `docs/index.html`
- `topics/inbox/`

## Status

The project structure is healthy under `krail doctor`.
The repo now has a public-facing GitHub Pages site under `docs/` plus a stronger first-pass literature map across foundations, benchmarks, geometry, execution, and LLM-interface work.

## Intended workflow

1. capture raw notes, links, and papers into `topics/inbox/`
2. add markdown frontmatter metadata to core notes (`title`, `kind`, `topics`, `entities`, `sources`, `relations`)
3. turn raw captures into synthesis notes in `topics/notes/`
4. build lightweight graph artifacts from markdown metadata with `node scripts/build_markdown_graph.js`
5. keep the repo updated daily when there is meaningful new signal
6. use git history as the research trail

## Markdown-native graph mode

This repo now uses a lightweight markdown mediator instead of waiting for full ontology build-out first.

See:
- `research_plan/graph/markdown-metadata-schema.md`
- `research_plan/graph/knowledge-graph-design.md`
- `research_plan/graph/graph.json`
- `research_plan/graph/graph.mmd`
