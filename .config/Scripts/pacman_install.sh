#!/usr/bin/env bash

echo
echo "INSTALLING PACKAGES"
echo

PKGS=(

    # SYSTEM --------------------------------------------------------------


    # TERMINAL UTILITIES --------------------------------------------------

    'neofetch'                # Shows system info when you launch terminal
    
    'unrar'                   # RAR compression program
    'unzip'                   # Zip compression program
    'zip'                     # Zip compression program

    'zsh'                     # Interactive shell
    'zsh-autosuggestions'     # Zsh Plugin
    'zsh-syntax-highlighting' # Zsh Plugin

    # GENERAL UTILITIES ---------------------------------------------------


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

)

for PKG in "${PKGS[@]}"; do
    echo "INSTALLING: ${PKG}"
    sudo pacman -S "$PKG" --noconfirm --needed
done

echo
echo "Done!"
echo
