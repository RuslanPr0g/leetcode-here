#!/bin/bash

set -euo pipefail

command -v tsc >/dev/null 2>&1 || { echo >&2 "TypeScript (tsc) is not installed. Install it with 'npm install -g typescript'."; exit 1; }
command -v node >/dev/null 2>&1 || { echo >&2 "Node.js is not installed. Install it first."; exit 1; }

find_ts_files() {
    find ./Problems -type f -name '*.ts' | sort
}

show_menu() {
    echo "Available problems:"
    local i=1
    for file in "${ts_files[@]}"; do
        echo "  [$i] $(basename "$file") (in $(dirname "$file"))"
        ((i++))
    done
    echo "  [x] Exit"
}

while true; do
    mapfile -t ts_files < <(find_ts_files)
    
    if [ "${#ts_files[@]}" -eq 0 ]; then
        echo "No .ts files found in ./Problems."
        exit 0
    fi

    echo ""
    show_menu

    echo -n "Select a problem to run [1-${#ts_files[@]} or x]: "
    read -r choice

    if [[ "$choice" == "x" || "$choice" == "X" ]]; then
        echo "Goodbye!"
        exit 0
    elif [[ "$choice" =~ ^[0-9]+$ && "$choice" -ge 1 && "$choice" -le "${#ts_files[@]}" ]]; then
        ts_file="${ts_files[choice-1]}"
        js_file="${ts_file%.ts}.js"

        echo "Compiling $ts_file..."
        tsc "$ts_file"

        echo "Running $(basename "$js_file")"
        echo "-----------------------------"
        node "$js_file"
        echo "-----------------------------"

        echo "Cleaning up..."
        # Im scared to run this: rm -f "$js_file"

        echo "Done."
    else
        echo "Invalid choice. Please try again."
    fi
done

