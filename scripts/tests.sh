#!/usr/bin/env bash

echo "Running pre-push hook"

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo "Test failed, push aborted. Pass tests for successful push."; exit 1
fi
