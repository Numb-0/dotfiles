#!/usr/bin/env bash

echo
echo "INSTALLING AUR PACKAGES"
echo

echo "Please enter username:"
read username

cd "${HOME}"

echo "CLONING: YAY"
git clone "https://aur.archlinux.org/yay.git"


PKGS=(

    # UTILITIES -----------------------------------------------------------

    # COMMUNICATIONS ------------------------------------------------------

    # THEMES --------------------------------------------------------------

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
