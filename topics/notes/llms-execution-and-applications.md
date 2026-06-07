# LLMs, execution, and applied TAMP frontiers

Updated: 2026-06-06

## Core view

LLMs look more useful as interface and repair modules than as the core planner.

The strongest pattern across current material is:
- let formal planners own correctness-critical search,
- let geometry/motion layers own feasibility,
- let execution layers own recovery,
- and use LLMs where language or iterative repair really helps.

## Where LLMs seem genuinely useful

### Natural-language front ends to constrained robot workflows
CLAIRify is a good example because it does not blindly trust language-model output. It uses iterative prompting plus verification to generate structured programs and then routes execution through a TAMP system.

Why this matters:
- turns language into a practical interface rather than a planner fantasy
- keeps formal verification in the loop
- fits domains where non-robotic experts need to instruct robots

Source:
- https://ac-rad.github.io/clairify/
- https://link.springer.com/article/10.1007/s10514-023-10136-2

### Targeted substitution of TAMP subroutines
The systematic study of LLMs with PDDLStream is useful mostly as a caution sign. Across thousands of problems, engineered components still beat the LLM-based variants on success rate and time.

Important takeaway:
- integration design matters more than raw model cleverness
- faster non-reasoning variants can outperform slower reasoning variants when the surrounding TAMP system corrects mistakes
- dumping more geometric detail into the prompt can actually increase task-level errors

Source:
- https://arxiv.org/abs/2510.00182

## Execution is still the hard reality layer

Behavior trees remain compelling because they make retries, fallbacks, guards, and local recovery explicit. They are less glamorous than end-to-end planners, but much closer to what breaks in real robots.

What to track here:
- handoff from planner to executor
- when to replan globally vs locally recover
- representation of resource locks and failure causes
- how execution traces feed back into the knowledge base

Source:
- https://arxiv.org/abs/2403.12761

## Applied domains worth watching

### Chemistry robotics
Chemistry is interesting because it adds:
- strong safety constraints
- many reusable instruments and tools
- users who want natural-language interfaces
- long procedures where execution drift matters a lot

CLAIRify makes this space especially relevant because it couples language, verification, and TAMP instead of treating them as separate demos.

### Dense tabletop rearrangement
This is the best near-term proving ground for scheduling-heavy dual-arm systems. It has enough complexity to matter without requiring the full mess of industrial assembly.

### Multi-arm assembly
This is probably the next escalation path once a rearrangement stack works. Assembly stresses long-horizon dependency handling, narrow-passage geometry, and failure recovery under contact-sensitive operations.

## Strong opinion

The right modern stack is not "LLM planner plus robot".
It is:
- a formal planning core,
- explicit scheduling/resource reasoning,
- a geometry-aware feasibility layer,
- a fast motion backend,
- and an execution wrapper with recovery.

LLMs belong around the edges unless they are being evaluated very carefully inside a constrained subsystem.

## Questions to keep pushing

- Can language models help propose useful abstractions without owning final decisions?
- How should execution failures be logged so the planner learns which symbolic plans are fragile?
- What is the cleanest bridge from natural-language task descriptions to benchmarkable dual-arm domains?
