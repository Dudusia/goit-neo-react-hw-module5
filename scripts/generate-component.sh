#!/bin/bash

if ! [ $# -eq "1" ]; then
	printf "usage: ${0} [component-name]"
	exit 0
fi

current_script="$(realpath ${BASH_SOURCE[0]})"
components_dir="$(dirname "$current_script")/../src/components"
new_component_name="$1"
new_component_dir="$components_dir/$new_component_name"

if [ -d "$new_component_dir" ]; then
    echo "$new_component_dir already exists."
else
    echo "$new_component_dir does not exist, creating..."
    mkdir "$new_component_dir"
fi

new_component_jsx="$new_component_dir/$new_component_name.jsx"
if [ -f "$new_component_jsx" ]; then
    echo "$new_component_jsx already exists."
else
    echo "$new_component_jsx does not exist, creating..."
    content="import css from \"./$new_component_name.module.css\";

const $new_component_name = ({

}) => (

);

export default $new_component_name;"
    echo "$content" > "$new_component_jsx"
fi

new_component_css="$new_component_dir/$new_component_name.module.css"
if [ -f "$new_component_css" ]; then
    echo "$new_component_css already exists."
else
    echo "$new_component_css does not exist, creating..."
    touch "$new_component_css"
fi
