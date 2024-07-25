#!/bin/bash

# Source mkinitcpio configuration file
. /etc/mkinitcpio.conf

# Array of NVIDIA modules to be managed
nvidia_entries=(nvidia nvidia_modeset nvidia_uvm nvidia_drm)

# Temporary array to hold modules not present in MODULES
new_entries=()

# Check each NVIDIA module if it exists in MODULES, and add to new_entries if not
for entry in "${nvidia_entries[@]}"; do
  if ! [[ " ${MODULES[*]} " =~ " $entry " ]]; then
    new_entries+=("$entry")
  fi
done

# Assign new_entries back to nvidia_entries
nvidia_entries=("${new_entries[@]}")

# Add nvidia_entries array to MODULES array
MODULES+=("${nvidia_entries[@]}")

# Write the updated configuration back to mkinitcpio.conf
cat <<EOF > /etc/mkinitcpio.conf
MODULES=(${MODULES[@]})
BINARIES=(${BINARIES[@]})
FILES=(${FILES[@]})
HOOKS=(${HOOKS[@]})
EOF


echo options nvidia_drm modeset=1 fbdev=1 > /etc/modprobe.d/nvidia.conf

sudo mkinitcpio -P
