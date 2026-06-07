## Summary

I'm using the RAIL/KRAIL platform to build a local-first robotics task-and-motion-planning knowledge base, and I've found a strong use case for a **markdown-native, frontmatter-driven graph mode** that sits between plain note capture and full ontology/hydration setup.

Repo/use case:
- local repo: `robotics-tamp-kb`
- topic: dual-arm TAMP, scheduling, geometry-aware feasibility, execution/replanning
- workflow goal: turn research notes + source captures into a queryable systems map

Implementation update from the field:
- I now have a working markdown-frontmatter mediator in the repo
- it emits graph JSON + Mermaid from note metadata
- GitHub Pages now reads graph data from `docs/data/graph.json`
- this confirmed the use case is real, not hypothetical

## How I'm using RAIL today

What's working well:
- `rail capture` into markdown inbox notes
- repo-backed research state and synthesis notes
- `rail search` over local markdown evidence
- pack-driven project structure and auditability

What I'm doing in practice:
- storing metadata at the top of markdown files
- extracting entities/relations from frontmatter
- generating a structured graph artifact from markdown
- using that graph to represent packages, methods, benchmarks, failure modes, and project ideas
- copying generated graph artifacts into the Pages-served docs folder so the site can render live repo structure

## The current gap

For this use case, the full ontology/hydration path feels too heavy as the first step, while plain markdown search is too weak.

Concretely, I hit this middle-ground gap:
- I want structured entities and relations
- I want git-friendly markdown as the source of truth
- I do **not** always want to author a full ontology + pipelines stack first
- I still want graph queries, relationship browsing, and lightweight synthesis over structured metadata

In my project, `rail doctor` is happy, but the graph side is basically empty until I add ontology classes, source definitions, and pipeline YAMLs. That pushes the repo toward “research notes” instead of “markdown-backed knowledge graph”.

Concrete friction I hit:
- `rail hydrate` fails in local mode without `.ontology/pipelines/project-default.yaml`
- `rail query classes` is not useful when the ontology is intentionally still lightweight
- I had to write a custom parser just to turn markdown metadata into graph nodes and edges
- there is no native bridge from research-note capture to markdown-derived graph query

## What would help in the core engine

### 1. First-class markdown frontmatter ingestion
Support something like this as a native project mode:

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
relations:
  - from: PDDLStream
    type: baseline_for
    to: dual-arm TAMP experiments
---
```

Desired behavior:
- scan markdown files
- ingest frontmatter into a local graph/index
- expose entities, sources, relations, and document links without custom glue code
- preserve markdown as the editable source of truth

### 2. A lightweight “graph-from-markdown” project mode
Example idea:
- `mode: markdown_graph`
- source of truth = markdown files with frontmatter
- no required ontology class definitions on day 1
- optional later migration into full ontology mode

This would be perfect for literature-heavy research repos.

### 3. Native query support over markdown-derived entities
Useful commands would be:
- list entity names/types from markdown metadata
- show edges involving an entity
- show documents that assert a relation
- filter by topic/kind/source

Right now I can script this externally, but it feels like a missing sweet spot in the engine.

### 4. Minimal hydration path without full pipeline scaffolding
It would help if `rail hydrate` could work in a lightweight local mode like:
- scan markdown frontmatter
- rebuild local graph/cache
- emit graph artifacts

without requiring `.ontology/pipelines/project-default.yaml` just to make the project useful.

This is especially important for note-heavy KBs where the first useful artifact is a graph built from curated markdown, not a full data pipeline.

### 5. Better bridge between research packs and graph packs
The `research-intelligence` pack is good for:
- papers
- claims
- evidence
- experiments

But for research KBs, a pack should also natively support:
- Package
- Method
- Benchmark
- FailureMode
- ProjectIdea
- system-map relationships

In other words: the “literature review” half and the “knowledge graph” half should connect more cleanly.

## Why this matters

For robotics and adjacent technical domains, the most useful knowledge base is often not:
- a loose pile of notes
- or a fully modeled ontology from day 1

It is a middle layer:
- markdown-native
- structured enough for graphs
- easy to evolve
- easy to review in git
- easy to extend into richer ontology later

That middle layer feels extremely valuable for:
- literature reviews
- package/tooling maps
- benchmark maps
- project idea tracking
- domain-specific systems synthesis

## What I built locally as a stopgap

In my local robotics KB, I added:
- markdown frontmatter to core notes
- `entity_metadata` typing in markdown
- a small extractor script that builds graph JSON + Mermaid from markdown metadata
- Pages-facing copies in `docs/data/`
- CI/verification hooks that rebuild the graph and fail if generated artifacts are stale

That works, but it feels like functionality the core engine could probably own in a much cleaner way.

Current shape of the generated graph:
- documents with metadata-backed graph entries
- typed entities like `Package`, `Method`, `Benchmark`, `FailureMode`, `ExecutionFramework`
- relation triples like `PDDLStream baseline_for dual-arm TAMP experiments`
- a static site that reads those artifacts directly

## Request

I'd love support for a first-class markdown-frontmatter-to-graph workflow in RAIL/KRAIL.

If helpful, I can share the exact frontmatter schema and the tiny local mediator script I used as a reference point.
