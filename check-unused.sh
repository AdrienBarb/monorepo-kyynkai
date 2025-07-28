#!/bin/bash
for dir in apps/* packages/*; do
    if [ -d "$dir" ]; then
        echo "Checking unused dependencies in $dir"
        (cd "$dir" && depcheck)
    fi
done