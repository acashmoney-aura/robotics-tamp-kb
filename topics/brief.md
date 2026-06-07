---
title: Robotics TAMP KB Brief
kind: brief
updated: 2026-06-07
topics:
  - dual-arm-planning
  - task-motion-scheduling
  - geometry-aware-feasibility
  - execution-replanning
entities:
  - PDDLStream
  - COAST
  - Drake
  - IRIS
  - Graphs of Convex Sets
  - behavior trees
  - dual-arm rearrangement
entity_metadata:
  - name: PDDLStream
    entity_type: Package
  - name: COAST
    entity_type: Package
  - name: Drake
    entity_type: Package
  - name: IRIS
    entity_type: GeometryTechnique
  - name: Graphs of Convex Sets
    entity_type: GeometryTechnique
  - name: behavior trees
    entity_type: ExecutionFramework
  - name: dual-arm rearrangement
    entity_type: Benchmark
relations:
  - from: PDDLStream
    type: relevant_to
    to: task-motion-scheduling
  - from: COAST
    type: narrows
    to: symbolic search
  - from: Drake
    type: includes
    to: IRIS
  - from: Graphs of Convex Sets
    type: supports
    to: geometry-aware-feasibility
  - from: behavior trees
    type: supports
    to: execution-replanning
---

# Robotics TAMP KB Brief

This project is a local-first knowledge base for robotics task-and-motion planning, with special focus on dual-arm coordination, scheduling, geometric feasibility, and execution/replanning.

Priority themes:
- PDDLStream and successor-style solvers
- dual-arm rearrangement / assembly / handoff tasks
- explicit task-motion-scheduling and shared-resource reasoning
- graphs of convex sets, IRIS, and Drake-based geometry reasoning
- behavior trees and execution-layer robustness
- practical open-source packages and benchmark tasks
- cautious use of LLMs as interfaces or repair modules rather than core planners

The goal is not just to collect links. It is to turn research into a durable, searchable systems map with useful notes and project ideas.
