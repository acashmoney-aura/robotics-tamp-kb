# Markdown metadata schema for the robotics KB

Updated: 2026-06-07

This repo now treats markdown frontmatter as the primary lightweight structure layer.

## Goal

Keep the repo markdown-native while still making it possible to build:
- entity lists
- relationship lists
- graph views
- package maps
- benchmark maps
- project-idea maps

without depending on the full ontology/hydration stack first.

## Frontmatter shape

```yaml
---
title: Benchmark and tooling map for dual-arm TAMP
kind: synthesis-note
updated: 2026-06-07
topics:
  - benchmarks
  - dual-arm-planning
entities:
  - PDDLStream
  - COAST
  - SDAR
entity_metadata:
  - name: PDDLStream
    entity_type: Package
  - name: COAST
    entity_type: Package
  - name: SDAR
    entity_type: Method
sources:
  - https://arxiv.org/abs/1802.08705
  - https://github.com/caelan/pddlstream
relations:
  - from: PDDLStream
    type: baseline_for
    to: dual-arm TAMP experiments
  - from: COAST
    type: narrows
    to: symbolic search
---
```

## Fields

### Required
- `title`
- `kind`

### Recommended
- `updated`
- `topics`
- `entities`
- `entity_metadata`
- `sources`
- `relations`

### `kind` values
- `brief`
- `synthesis-note`
- `research-note`
- `design-note`
- `plan`
- `registry`
- `capture`

## `entity_metadata`

Use `entities` for quick mention lists.
Use `entity_metadata` when you want lightweight typing without full ontology setup.

Example:

```yaml
entity_metadata:
  - name: PDDLStream
    entity_type: Package
  - name: shared-resource conflict
    entity_type: FailureMode
  - name: entangled tabletop rearrangement
    entity_type: Benchmark
```

Recommended early types:
- `Package`
- `Method`
- `Benchmark`
- `FailureMode`
- `GeometryTechnique`
- `ExecutionFramework`
- `TaskFamily`
- `SystemDesign`
- `ProjectIdea`

## Relation model

Each relation is a triple:
- `from`
- `type`
- `to`

Examples:
- `Package IMPLEMENTS Method`
- `Benchmark EXPOSES FailureMode`
- `Method REQUIRES GeometryTechnique`
- `ProjectIdea BUILDS_ON Package`

The wording does not need to be globally perfect on day 1.
The important thing is to be explicit enough that a graph extractor can use it.

## Why this is useful

This keeps the knowledge base:
- easy to edit by hand
- git-friendly
- portable
- reviewable in plain markdown
- compatible with later ontology migration

## Current mediator

Use:

```bash
node scripts/build_markdown_graph.js
```

It reads markdown frontmatter and emits:
- `research_plan/graph/graph.json`
- `research_plan/graph/graph.mmd`
- `research_plan/graph/summary.md`
- `docs/data/graph.json`
- `docs/data/graph.mmd`

The GitHub Pages site reads from `docs/data/graph.json`.

## Long-term view

If the core RAIL engine later gains first-class markdown-frontmatter ingestion, these files can become the bridge layer instead of throwaway scaffolding.
