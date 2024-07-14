#!/usr/bin/env bash

echo
echo "INSTALLING PACKAGES"
echo

PKGS=(

    # SYSTEM --------------------------------------------------------------
    
    'qt5-wayland'             # Needed for hypr
    'qt6-wayland'
    'xdg-desktop-portal-hyprland'
    'xdg-desktop-portal-gtk'
    'hyprpaper'               # Wallpaper
    'kitty'                   # Terminal
    'greetd-tuigreet'         # Display Manager
    'polkit-kde-agent'        # Authentication Agent
    'cliphist'                # ClipBoard Manager
    'udiskie'                 # Automount Utility
    'linux-headers'
    'linux-lts-headers'
    'thunar'
    'thunar-volman'
    # TERMINAL UTILITIES --------------------------------------------------

    'neofetch'                # Shows system info when you launch terminal
    'neovim'                  # Text Editor
    'stow'                    # Dotfiles copy Util

    'unrar'                   # RAR compression program
    'unzip'                   # Zip compression program
    'zip'                     # Zip compression program

    'zsh'                     # Interactive shell
    'eza'                     # Better ls	
    'ripgrep'                 # Directory Search
    'tree'                    # Directory tree visualizer

    # GENERAL UTILITIES ---------------------------------------------------
    
    'ttf-jetbrains-mono-nerd' # Font for Terminal

    # DEVELOPMENT ---------------------------------------------------------

    'cmake'                 # Cross-platform open-source make system
    'code'                  # Visual Studio Code
    'electron'              # Cross-platform development using Javascript
    'git'                   # Version control system
    'gcc'                   # C/C++ compiler
    'python'                # Scripting language
    'yarn'                  # Dependency management (Hyper needs this)

    # MEDIA ---------------------------------------------------------------
    
    'imv'
    'spotify-launcher'

    # PRODUCTIVITY --------------------------------------------------------
    
    'xpdf'                  # PDF viewer
    
    # NVIDIA --------------------------------------------------------------
    
    'nvidia-dkms'

    # AGS UTILS
    
    'libdbusmenu-gtk3'
    'npm'
    'gvfs' 
    'upower'
    'brightnessctl'
    'sassc'
  )

for PKG in "${PKGS[@]}"; do
    echo "INSTALLING: ${PKG}"
    sudo pacman -S "$PKG" --noconfirm --needed
done

echo
echo "Done!"
echo
