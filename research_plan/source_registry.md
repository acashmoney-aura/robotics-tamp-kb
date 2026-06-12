---
title: Source Registry
kind: registry
updated: 2026-06-10
topics:
  - sources
  - packages
  - papers
  - benchmarks
entities:
  - PDDLStream
  - Fast Downward
  - COAST
  - Drake
  - IRIS
  - SDAR
  - CLAIRify
  - C-IRIS
entity_metadata:
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
  - name: SDAR
    entity_type: Method
  - name: CLAIRify
    entity_type: Package
  - name: C-IRIS
    entity_type: GeometryTechnique
relations:
  - from: Source Registry
    type: tracks
    to: PDDLStream
  - from: Source Registry
    type: tracks
    to: SDAR
  - from: Source Registry
    type: tracks
    to: CLAIRify
  - from: Source Registry
    type: tracks
    to: C-IRIS
---

# Source Registry

Updated: 2026-06-10

| Bucket | Source | Type | Why it matters | Status |
|---|---|---|---|---|
| PDDLStream foundation | https://arxiv.org/abs/1802.08705 | paper | canonical integrated symbolic + sampler-based TAMP baseline | captured + synthesized |
| PDDLStream code | https://github.com/caelan/pddlstream | code | practical reference implementation and examples | captured |
| Symbolic backend | https://github.com/aibasel/downward | code | classical-planning backbone used by many PDDL systems | captured |
| Search guidance | https://arxiv.org/abs/2210.14055 | paper | lazy / policy-guided search perspective for TAMP | captured |
| Constraint-guided TAMP | https://branvu.github.io/coast.github.io/ | project page | constraint-first narrowing of symbolic search | captured |
| Geometry regions | https://drake.mit.edu/doxygen_cxx/group__planning__iris.html | docs | IRIS free-space regions in Drake | captured |
| Certified geometry decomposition | https://alexandreamice.github.io/publication/dai-2023-certified/ | paper | C-IRIS gives certified collision-free convex regions and explicitly scales to a 12-DOF bimanual setup | captured + synthesized |
| Scene-graph planning abstraction | https://arxiv.org/abs/2403.08094 | paper | useful contrast case for deriving sparse planning domains from rich world models; more mobile-manipulation than dual-arm, but good abstraction lesson | captured + synthesized |
| GCS search acceleration | https://www.roboticsproceedings.org/rss20/p113.html | paper | search-based planning over graphs of convex sets | captured |
| Execution layer | https://arxiv.org/abs/2403.12761 | paper | behavior-tree / execution-recovery relevance | captured |
| Dual-arm target system | https://arxiv.org/abs/2512.08206 | paper | most on-target dual-arm rearrangement paper in current set | captured + synthesized |
| Dual-arm implementation | https://github.com/arc-l/dual-arm | code | concrete SDAR code, benchmark scripts, task JSON structure | captured |
| Dual-arm project page | https://duozhangrobotics.github.io/projects/dual-arm-icra-2026/ | project page | concise system + hardware-transfer summary | captured |
| Benchmark framing | https://kavrakilab.rice.edu/publications/lagriffoul2018tmp-benchmarks.pdf | paper | platform-independent TAMP benchmark framing | tracked, needs cleaner extract |
| LLM + TAMP systematic eval | https://arxiv.org/abs/2510.00182 | paper | direct evidence against naive LLM-centered TAMP | captured |
| Language-to-TAMP application | https://ac-rad.github.io/clairify/ | project page | good example of language + verification + TAMP | captured |
| CLAIRify paper | https://link.springer.com/article/10.1007/s10514-023-10136-2 | paper | applied robotics pipeline for chemistry tasks | captured |
| Planner compute routing | http://arxiv.org/abs/2606.12402 | paper | adaptive test-time compute allocation for embodied planners; strong latency/success framing | captured + synthesized |
| Force-aware cheap-arm manipulation | http://arxiv.org/abs/2606.12406 | paper | learned external torque estimation without premium force hardware | captured + synthesized |
| World-action priors for VLAs | http://arxiv.org/abs/2606.12403 | paper | scene-evolution priors steering manipulation policies | captured + synthesized |
| Decentralized shared VLA collaboration | http://arxiv.org/abs/2606.12352 | paper | multi-robot coordination from one shared backbone without inference-time communication | captured + synthesized |
| Action-expert pretraining | http://arxiv.org/abs/2606.12366 | paper | better instruction generalization by factoring action priors from language conditioning | captured + synthesized |
| Dexterous articulated tool use | https://arxiv.org/abs/2606.13677 | paper | structured keyframe/planning/RL pipeline for tool manipulation | captured + synthesized |
| Fast manipulation world model | https://arxiv.org/abs/2606.13672 | paper | practical long-horizon world model with hardware relevance and speed claims | captured + synthesized |
| Flow reversal steering | https://arxiv.org/abs/2606.13675 | paper | steerable robot generalists via latent inversion and nearby action-mode guidance | captured + synthesized |
| Scientific-lab VLA | https://arxiv.org/abs/2606.13578 | paper | meaningful robotics × laboratory workflow frontier | captured + synthesized |
| Mask-centric world-action modeling | https://arxiv.org/abs/2606.13515 | paper | stronger spatial grounding than text-only prompting for manipulation | captured + synthesized |
| Anatomical priors in dexterity | https://arxiv.org/abs/2606.13601 | paper | embodiment itself carrying part of the control prior | captured + synthesized |

## Gaps to fill next

- one strong survey or tutorial that spans task planning, motion planning, and execution
- one assembly-specific dual-arm benchmark set
- one source on scheduling formulations between symbolic and geometric layers
- one reproducible Drake/GCS example that is easier to run than a full lab stack
- one direct comparison of C-IRIS-style geometry summaries vs stream-only feasibility checks in manipulation planning
