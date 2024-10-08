#!/usr/bin/env bash

echo
echo "INSTALLING AUR PACKAGES"
echo

cd "${HOME}"

echo "CLONING: YAY"
git clone "https://aur.archlinux.org/yay.git"


PKGS=(
    # Hyprland
    
    'hyperland-git'
    'hyperlock-git'
    'hyprshot-git'
    # UTILITIES -----------------------------------------------------------
    
    'aylurs-gtk-shell'
    'libastal-meta' # Support lib for ags

    # COMMUNICATIONS ------------------------------------------------------

    # THEMES --------------------------------------------------------------
    
    'pokemon-colorscripts'
    'bibata-cursor-git'
    
    # APPS ----------------------------------------------------------------

    'discord'                       # Chat for gamers

)

cd ${HOME}/yay
makepkg -si

# Change default shell
chsh -s $(which zsh)

for PKG in "${PKGS[@]}"; do
    yay -S --noconfirm $PKG
done

echo
echo "Done!"
echo
