#!/bin/bash
cd /home/kavia/workspace/code-generation/recipehub-31863-cf78b90a/recipe_backend_workspace/recipe_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

