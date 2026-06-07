# Source Registry

Updated: 2026-06-06

| Bucket | Source | Type | Why it matters | Status |
|---|---|---|---|---|
| PDDLStream foundation | https://arxiv.org/abs/1802.08705 | paper | canonical integrated symbolic + sampler-based TAMP baseline | captured + synthesized |
| PDDLStream code | https://github.com/caelan/pddlstream | code | practical reference implementation and examples | captured |
| Symbolic backend | https://github.com/aibasel/downward | code | classical-planning backbone used by many PDDL systems | captured |
| Search guidance | https://arxiv.org/abs/2210.14055 | paper | lazy / policy-guided search perspective for TAMP | captured |
| Constraint-guided TAMP | https://branvu.github.io/coast.github.io/ | project page | constraint-first narrowing of symbolic search | captured |
| Geometry regions | https://drake.mit.edu/doxygen_cxx/group__planning__iris.html | docs | IRIS free-space regions in Drake | captured |
| GCS search acceleration | https://www.roboticsproceedings.org/rss20/p113.html | paper | search-based planning over graphs of convex sets | captured |
| Execution layer | https://arxiv.org/abs/2403.12761 | paper | behavior-tree / execution-recovery relevance | captured |
| Dual-arm target system | https://arxiv.org/abs/2512.08206 | paper | most on-target dual-arm rearrangement paper in current set | captured + synthesized |
| Dual-arm implementation | https://github.com/arc-l/dual-arm | code | concrete SDAR code, benchmark scripts, task JSON structure | captured |
| Dual-arm project page | https://duozhangrobotics.github.io/projects/dual-arm-icra-2026/ | project page | concise system + hardware-transfer summary | captured |
| Benchmark framing | https://kavrakilab.rice.edu/publications/lagriffoul2018tmp-benchmarks.pdf | paper | platform-independent TAMP benchmark framing | tracked, needs cleaner extract |
| LLM + TAMP systematic eval | https://arxiv.org/abs/2510.00182 | paper | direct evidence against naive LLM-centered TAMP | captured |
| Language-to-TAMP application | https://ac-rad.github.io/clairify/ | project page | good example of language + verification + TAMP | captured |
| CLAIRify paper | https://link.springer.com/article/10.1007/s10514-023-10136-2 | paper | applied robotics pipeline for chemistry tasks | captured |

## Gaps to fill next

- one strong survey or tutorial that spans task planning, motion planning, and execution
- one assembly-specific dual-arm benchmark set
- one source on scheduling formulations between symbolic and geometric layers
- one reproducible Drake/GCS example that is easier to run than a full lab stack
