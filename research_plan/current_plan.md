---
title: Current Plan
kind: plan
updated: 2026-06-07
topics:
  - planning
  - ontology-lite
  - graph-building
  - daily-refresh
entities:
  - PDDLStream
  - COAST
  - Drake
  - IRIS
  - behavior trees
  - scheduling formulations
  - assembly benchmarks
  - markdown metadata graph
entity_metadata:
  - name: PDDLStream
    entity_type: Package
  - name: COAST
    entity_type: Package
  - name: Drake
    entity_type: Package
  - name: IRIS
    entity_type: GeometryTechnique
  - name: behavior trees
    entity_type: ExecutionFramework
  - name: scheduling formulations
    entity_type: Method
  - name: assembly benchmarks
    entity_type: Benchmark
  - name: markdown metadata graph
    entity_type: SystemDesign
relations:
  - from: markdown metadata graph
    type: expands
    to: robotics knowledge base
---

# Current Plan

## Objective
Build a durable robotics knowledge base around dual-arm task-and-motion planning and keep it fresh with new research notes, source captures, and concise synthesis.

## Current focus
1. Establish the foundational stack: PDDLStream, LAZY, COAST, GCS/IRIS/Drake, and behavior-tree execution.
2. Track dual-arm-specific benchmarks and failure modes.
3. Turn raw links and emails into actual notes with opinions, caveats, and project ideas.
4. Keep the repository auditable so daily updates are visible in git history.

## Next moves
- Add one scheduling-focused note that explicitly compares symbolic-only, hybrid, and optimization-based formulations.
- Add one assembly-specific benchmark/source bundle to complement rearrangement-heavy coverage.
- Turn the GitHub Pages site into a cleaner source browser with auto-generated sections if the repo grows.
- Keep the daily refresh automation tied to research emails and lightweight web checks.
- Stop treating the repo as notes-first only: add a real ontology, seed entity records, and a minimal hydration pipeline.
- Build a first package/method/benchmark/failure-mode graph from the existing notes and source registry.
- Expand topic coverage into scheduling, assembly, motion backends, execution robustness, and Akash-specific project ideas.
