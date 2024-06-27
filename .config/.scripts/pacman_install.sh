#!/usr/bin/env bash

echo
echo "INSTALLING PACKAGES"
echo

PKGS=(

    # SYSTEM --------------------------------------------------------------
    
    'qt5-wayland'             # Needed for hypr
    'qt6-wayland'
    'xdg-desktop-portal-hyprland'
    'hyprpaper'               # Wallpaper
    'kitty'                   # Terminal
    'ly'                      # Display Manager

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


    # PRODUCTIVITY --------------------------------------------------------

    'xpdf'                  # PDF viewer
    
    # NVIDIA --------------------------------------------------------------
    'nvidia'
)

for PKG in "${PKGS[@]}"; do
    echo "INSTALLING: ${PKG}"
    sudo pacman -S "$PKG" --noconfirm --needed
done

echo
echo "Done!"
echo
