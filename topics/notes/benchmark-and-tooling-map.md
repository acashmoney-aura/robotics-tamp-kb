---
title: Benchmark and tooling map for dual-arm TAMP
kind: synthesis-note
updated: 2026-06-07
topics:
  - benchmarks
  - packages
  - geometry
  - gpu-motion-planning
  - dual-arm-planning
entities:
  - SDAR
  - PDDLStream
  - Fast Downward
  - COAST
  - Drake
  - IRIS
  - Graphs of Convex Sets
  - CuRobo
  - entangled tabletop rearrangement
  - platform-independent TAMP benchmarks
  - assembly benchmarks
  - execution-heavy benchmarks
  - shared-resource conflict
entity_metadata:
  - name: SDAR
    entity_type: Method
  - name: PDDLStream
    entity_type: Package
  - name: Fast Downward
    entity_type: Package
  - name: COAST
    entity_type: Package
  - name: Drake
    entity_type: Package
  - name: IRIS
    entity_type: GeometryTechnique
  - name: Graphs of Convex Sets
    entity_type: GeometryTechnique
  - name: CuRobo
    entity_type: Package
  - name: entangled tabletop rearrangement
    entity_type: Benchmark
  - name: platform-independent TAMP benchmarks
    entity_type: Benchmark
  - name: assembly benchmarks
    entity_type: Benchmark
  - name: execution-heavy benchmarks
    entity_type: Benchmark
  - name: shared-resource conflict
    entity_type: FailureMode
sources:
  - https://arxiv.org/abs/2512.08206
  - https://github.com/arc-l/dual-arm
  - https://duozhangrobotics.github.io/projects/dual-arm-icra-2026/
  - https://kavrakilab.rice.edu/publications/lagriffoul2018tmp-benchmarks.pdf
  - https://arxiv.org/abs/1802.08705
  - https://github.com/caelan/pddlstream
  - https://github.com/aibasel/downward
  - https://branvu.github.io/coast.github.io/
  - https://drake.mit.edu/doxygen_cxx/group__planning__iris.html
  - https://www.roboticsproceedings.org/rss20/p113.html
relations:
  - from: SDAR
    type: evaluates_on
    to: entangled tabletop rearrangement
  - from: entangled tabletop rearrangement
    type: exposes
    to: shared-resource conflict
  - from: PDDLStream
    type: baseline_for
    to: dual-arm TAMP experiments
  - from: Fast Downward
    type: symbolic_backbone_for
    to: PDDL-style planning
  - from: COAST
    type: narrows
    to: symbolic search
  - from: Drake
    type: includes
    to: IRIS
  - from: Graphs of Convex Sets
    type: supports
    to: motion search acceleration
  - from: CuRobo
    type: accelerates
    to: motion feasibility evaluation
---

# Benchmark and tooling map for dual-arm TAMP

Updated: 2026-06-07

## Why this note exists

A useful robotics knowledge base should not stop at papers. It should answer two practical questions:

1. what benchmarks actually expose the hard systems failures?
2. what open-source tools are realistic enough to build on?

## Benchmark families that matter

### 1) Entangled tabletop rearrangement
This is the cleanest current benchmark family for dual-arm TAMP because the difficulty is not just grasping. The challenge is dependency structure: object A blocks B, B blocks C, and some moves become efficient only if both arms can operate synchronously.

Why it matters:
- forces explicit coordination between arms
- exposes when a planner lacks a scheduling layer
- creates cases where a single-arm-optimal task order is globally bad for dual-arm execution

Most directly relevant source right now: SDAR and its evaluation setup over random, cycled, double-cycled, and mixed dependency structures.

Sources:
- https://arxiv.org/abs/2512.08206
- https://github.com/arc-l/dual-arm
- https://duozhangrobotics.github.io/projects/dual-arm-icra-2026/

### 2) Platform-independent TAMP benchmarks
The older benchmark push still matters because it tried to separate benchmark design from any one robot stack. That is useful if the goal is to compare planning architectures rather than just one implementation.

What to keep from this line of work:
- standardized task descriptions
- separation of manipulation difficulty from software idiosyncrasies
- emphasis on reproducibility across systems

Source:
- https://kavrakilab.rice.edu/publications/lagriffoul2018tmp-benchmarks.pdf

### 3) Assembly and multi-arm constrained workspaces
Assembly-style domains matter because they introduce fixtures, narrow passages, and ordering constraints that punish late feasibility checks. They are a good next step after tabletop rearrangement because they make collision structure and shared-resource locks more explicit.

Desired benchmark properties:
- handoff or co-manipulation
- constrained insertion or alignment
- repeated need for regrasp / staging
- time overlap decisions that can help or hurt feasibility

### 4) Execution-heavy benchmarks
A lot of planning work looks good until perception drifts, a grasp fails, or timing assumptions break. Behavior-tree and execution-layer benchmarks matter because they reveal whether the system can degrade gracefully.

Source to track:
- https://arxiv.org/abs/2403.12761

## Tooling stack worth tracking

### PDDLStream
Still one of the strongest base abstractions for integrated symbolic + geometric planning.

Why it stays important:
- mature conceptual model
- black-box samplers are flexible
- many downstream papers still position against it
- close enough to the robotics-planning literature to remain a reference point

Practical note:
It is attractive for experiments because it is conceptually clean, but many interesting systems improvements now happen around search guidance, scheduling, and execution instead of only inside the core abstraction.

Sources:
- https://arxiv.org/abs/1802.08705
- https://github.com/caelan/pddlstream

### Fast Downward
Fast Downward is not a TAMP system by itself, but it remains important as the symbolic backbone behind many PDDL-centric systems.

Why it matters:
- strong baseline symbolic planning infrastructure
- widely reused in research code
- useful to understand where symbolic branching is being pushed before geometry enters

Source:
- https://github.com/aibasel/downward

### COAST
COAST is worth watching because it tries to shrink search earlier using constraints and streams rather than waiting for a late geometric crash.

This is especially relevant for dual-arm systems, where symbolic branching can explode if the planner cannot cheaply recognize impossible coordination patterns.

Source:
- https://branvu.github.io/coast.github.io/

### Drake / IRIS / GCS
This family matters when the repo's focus shifts from planning logic to geometry structure.

Why it matters:
- IRIS offers a way to carve out convex free-space regions
- GCS gives a structured trajectory-planning view over those regions
- Drake is an ecosystem where geometry, dynamics, and planning can live together

The most interesting systems question is not whether GCS replaces TAMP. It is whether geometry summaries from Drake/GCS-style methods can be surfaced early enough to improve task-level decisions.

Sources:
- https://drake.mit.edu/doxygen_cxx/group__planning__iris.html
- https://www.roboticsproceedings.org/rss20/p113.html

### CuRobo-style GPU motion planning
GPU-accelerated motion planning becomes much more interesting when a dual-arm scheduler needs to evaluate many candidate synchronized plans quickly. SDAR is a concrete example of this direction.

Source:
- https://github.com/arc-l/dual-arm

## Best first experimental path

If the goal is a realistic Akash-aligned path:

1. start with a PDDLStream-style problem formulation for interpretability
2. make scheduling/resource conflicts explicit instead of burying them in operators
3. use a strong motion backend that can test many candidate synchronized plans
4. add execution fallbacks with behavior-tree-style recovery

That path fits better than jumping directly into "LLM plans everything".

## Concrete project ideas

- Rebuild one entangled tabletop rearrangement benchmark with an explicit scheduling layer.
- Compare single-arm-optimal symbolic decompositions against dual-arm-aware decompositions.
- Use GPU motion planning only as a feasibility oracle at first, then progressively tighten integration.
- Try a geometry-summary layer that flags likely corridor conflicts before expensive motion calls.
