# Open Questions

Updated: 2026-06-06

## Architecture

- What is the cleanest explicit representation for task-motion-scheduling in a dual-arm stack?
- Should scheduling be encoded as symbolic fluents, separate optimization, or a hybrid search layer?
- How early can geometry summaries be inserted without making the planner too expensive?

## Benchmarks

- Which single benchmark should become the first canonical repo demo: dense rearrangement, assembly, or handoff?
- What metrics matter most beyond success rate: synchronized idle time, number of late feasibility collapses, replans per execution, or hardware transfer rate?

## Tool choice

- Is PDDLStream still the best experimentation base, or should the repo pivot faster toward Drake-heavy geometry?
- Can CuRobo-style GPU planning be used purely as a fast feasibility oracle before tighter integration?

## LLMs and interfaces

- Can LLMs help create abstractions or repair symbolic outputs without being trusted for core planning?
- How should natural-language task requests be normalized into benchmarkable TAMP task descriptions?

## Akash-aligned build path

- What is the best project that connects dual-arm TAMP, CUDA/GPU planning, and reproducible evaluation strongly enough to matter for ARC-style work?
