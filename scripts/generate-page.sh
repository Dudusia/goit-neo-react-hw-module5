#!/bin/bash

if ! [ $# -eq "1" ]; then
	printf "usage: ${0} [page-name]"
	exit 0
fi

current_script="$(realpath ${BASH_SOURCE[0]})"
pages_dir="$(dirname "$current_script")/../src/pages"
new_page_name="$1"
new_page_dir="$pages_dir/$new_page_name"

if [ -d "$new_page_dir" ]; then
    echo "$new_page_dir already exists."
else
    echo "$new_page_dir does not exist, creating..."
    mkdir "$new_page_dir"
fi

new_page_jsx="$new_page_dir/$new_page_name.jsx"
if [ -f "$new_page_jsx" ]; then
    echo "$new_page_jsx already exists."
else
    echo "$new_page_jsx does not exist, creating..."
    content="export default function $new_page_name() {
  return <div>$new_page_name</div>;
}"
    echo "$content" > "$new_page_jsx"
fi

new_page_css="$new_page_dir/$new_page_name.module.css"
if [ -f "$new_page_css" ]; then
    echo "$new_page_css already exists."
else
    echo "$new_page_css does not exist, creating..."
    touch "$new_page_css"
fi
