#!/bin/bash

# Path to the first folder
FOLDER_1="server"
# Path to the second folder
FOLDER_2="web"

# Function to run npx update and npm install
update_and_install() {
    cd "$1" || exit 1
    echo "Updating and installing in $1..."
    npx update
    npm install
}

# Run the update and install for both folders
update_and_install "$FOLDER_1"
update_and_install "$FOLDER_2"

echo "Update and install process completed for both folders!"
