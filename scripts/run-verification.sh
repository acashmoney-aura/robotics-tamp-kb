#!/usr/bin/env bash
set -euo pipefail

# Run deterministic checks for the current worker workspace.
node scripts/build_markdown_graph.js
python3 scripts/verify_project_state.py
