---
title: Initial systems landscape: dual-arm task and motion planning
kind: synthesis-note
updated: 2026-06-10
topics:
  - dual-arm-planning
  - task-motion-scheduling
  - symbolic-planning
  - motion-planning
  - execution
  - geometry
  - scene-graphs
entities:
  - PDDLStream
  - Policy-Guided Lazy Search with Feedback
  - COAST
  - Drake
  - IRIS
  - behavior trees
  - SDAR
  - task-motion-scheduling
  - entangled tabletop rearrangement
  - shared-resource conflict
  - corridor interference
  - C-IRIS
  - hierarchical 3D scene graphs
entity_metadata:
  - name: PDDLStream
    entity_type: Package
  - name: Policy-Guided Lazy Search with Feedback
    entity_type: Method
  - name: COAST
    entity_type: Package
  - name: Drake
    entity_type: Package
  - name: IRIS
    entity_type: GeometryTechnique
  - name: behavior trees
    entity_type: ExecutionFramework
  - name: SDAR
    entity_type: Method
  - name: task-motion-scheduling
    entity_type: Method
  - name: entangled tabletop rearrangement
    entity_type: Benchmark
  - name: shared-resource conflict
    entity_type: FailureMode
  - name: corridor interference
    entity_type: FailureMode
  - name: C-IRIS
    entity_type: GeometryTechnique
  - name: hierarchical 3D scene graphs
    entity_type: Method
sources:
  - https://arxiv.org/abs/1802.08705
  - https://arxiv.org/abs/2210.14055
  - https://branvu.github.io/coast.github.io/
  - https://drake.mit.edu/doxygen_cxx/group__planning__iris.html
  - https://arxiv.org/abs/2403.12761
  - https://arxiv.org/abs/2512.08206
  - https://alexandreamice.github.io/publication/dai-2023-certified/
  - https://arxiv.org/abs/2403.08094
relations:
  - from: PDDLStream
    type: baseline_for
    to: task-motion-scheduling
  - from: Policy-Guided Lazy Search with Feedback
    type: refines
    to: PDDLStream
  - from: COAST
    type: narrows
    to: symbolic search
  - from: Drake
    type: includes
    to: IRIS
  - from: SDAR
    type: targets
    to: entangled tabletop rearrangement
  - from: task-motion-scheduling
    type: addresses
    to: shared-resource conflict
  - from: task-motion-scheduling
    type: addresses
    to: corridor interference
  - from: behavior trees
    type: supports
    to: execution recovery
---

# Initial systems landscape: dual-arm task and motion planning

Updated: 2026-06-10

## Core thesis

The biggest systems gap is not just task planning or motion planning alone.
It is the missing middle layer that decides:

- what each arm should do,
- which actions may overlap,
- which shared resources are locked,
- when geometry should be tested early enough to avoid late collapse,
- and how execution should recover when the symbolic plan stops being feasible.

That gap is best described here as **task-motion-scheduling**.

## Why this matters

Long-horizon dual-arm tasks are much harsher than single-arm toy domains. A symbolic plan can look perfectly fine, but fail late because:

- arms interfere in shared workspace,
- one arm blocks the other's motion corridor,
- feasibility checks are deferred too long,
- durations drift and invalidate overlap assumptions,
- handoff or assembly order creates fragile dependencies.

## Key source buckets

### PDDLStream foundation
PDDLStream is the cleanest base abstraction for mixing symbolic planning with black-box geometric sampling. It is still one of the clearest starting points for reasoning about TAMP systems that must deal with kinematics, collisions, visibility, and motion constraints.

Source: https://arxiv.org/abs/1802.08705

### Search improvements over action skeletons
LAZY / Policy-Guided Lazy Search matters because it tries to keep a single integrated search that becomes progressively more geometrically informed, instead of separating symbolic planning too sharply from motion feasibility.

Source: https://arxiv.org/abs/2210.14055

### Constraint-guided TAMP
COAST is important because it uses constraints and streams together to shrink the task-planning search space before or during sampling. That feels especially relevant for dual-arm settings where brute-force symbolic branching explodes quickly.

Source: https://branvu.github.io/coast.github.io/

### Geometry-aware feasibility layers
Drake, IRIS, and Graphs of Convex Sets look promising for a more structured geometry layer. They matter when the question becomes: how do we represent feasible regions cleanly enough that high-level plans are not lying to us?

The strongest new addition here is C-IRIS. It is not just another motion-planning paper; it is evidence that certified convex decompositions can scale to a 12-DOF bimanual manipulator. That makes it much more relevant to dual-arm TAMP than generic geometry papers that never leave low-DOF toy settings.

Practical opinion: if a future stack wants to use Drake seriously, C-IRIS-style regions look like one of the few geometry summaries that could actually be surfaced early enough to help scheduling and avoid late symbolic collapse.

Sources:
- https://drake.mit.edu/doxygen_cxx/group__planning__iris.html
- https://alexandreamice.github.io/publication/dai-2023-certified/

### Execution / recovery layer
Behavior trees are interesting not as hype, but as a practical execution abstraction for retries, fallbacks, and replanning transitions.

Source: https://arxiv.org/abs/2403.12761

### Direct dual-arm target system
SDAR is the most directly relevant seed item because it focuses on synchronous dual-arm rearrangement, dependency-driven task planning, layered motion planning, and hardware transfer.

Source: https://arxiv.org/abs/2512.08206

### World-model abstraction, but with caution
Hierarchical 3D scene graphs are interesting because they show how to derive sparse planning domains from a much richer world model. That is a useful abstraction lesson for any knowledge-heavy planning system.

But this should stay secondary for now. It is more relevant to large-scene mobile manipulation than to the repo's core dual-arm tabletop focus. Good idea to borrow from; bad idea to let it distract the main benchmark path.

Source: https://arxiv.org/abs/2403.08094

## Benchmark tasks worth tracking

- entangled tabletop rearrangement
- shared shelf organization
- dual-arm assembly / block construction
- handoff across arm workspaces
- obstacle-clearing plus placement
- queue or conveyor tasks with continuous arrivals
- container holding plus insertion

## Practical opinion

The likely winning stack is not “LLM planner solves robotics.”
It is probably a layered system:

1. symbolic abstraction,
2. scheduling / resource reasoning,
3. geometry-aware feasibility checks, ideally with reusable summaries rather than only fresh stream calls,
4. fast motion planning backend,
5. execution and recovery.

That is a systems-engineering problem more than a prompting problem.

## Immediate next questions

- What is the cleanest open-source experiment path: PDDLStream, Drake/GCS, or a hybrid?
- How should dual-arm scheduling be represented explicitly rather than buried inside symbolic operators?
- Which benchmark should become the first reproducible project target?
- How should this map onto Akash's path-planning / CUDA / ARC interests?
