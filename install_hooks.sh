#!/bin/bash
PWD=$(pwd)
HOOKS_DIR="$PWD/.git-hooks"

chmod +x $HOOKS_DIR/*.sh

rm .git/hooks/pre-commit 2>/dev/null
ln -s $HOOKS_DIR/pre-commit.sh .git/hooks/pre-commit
