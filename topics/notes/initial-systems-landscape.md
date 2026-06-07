# Initial systems landscape: dual-arm task and motion planning

Updated: 2026-06-06

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

Source: https://drake.mit.edu/doxygen_cxx/group__planning__iris.html

### Execution / recovery layer
Behavior trees are interesting not as hype, but as a practical execution abstraction for retries, fallbacks, and replanning transitions.

Source: https://arxiv.org/abs/2403.12761

### Direct dual-arm target system
SDAR is the most directly relevant seed item because it focuses on synchronous dual-arm rearrangement, dependency-driven task planning, layered motion planning, and hardware transfer.

Source: https://arxiv.org/abs/2512.08206

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
3. geometry-aware feasibility checks,
4. fast motion planning backend,
5. execution and recovery.

That is a systems-engineering problem more than a prompting problem.

## Immediate next questions

- What is the cleanest open-source experiment path: PDDLStream, Drake/GCS, or a hybrid?
- How should dual-arm scheduling be represented explicitly rather than buried inside symbolic operators?
- Which benchmark should become the first reproducible project target?
- How should this map onto Akash's path-planning / CUDA / ARC interests?
