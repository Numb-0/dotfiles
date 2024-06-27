# Cosix dotfiles

This directory contains the dotfiles for my system

## Requirements

Ensure you have the following installed on your system

### Git

```
pacman -Sy git
```

### Stow

```
pacman -Sy stow
```

## Installation

First, check out the dotfiles repo in your $HOME directory using git

```
$ git clone https://github.com/Numb-0/dotfiles.git
$ cd dotfiles
```

then use GNU stow to create symlinks

```
$ stow .
```

## Infos
Nvidia hypr
env = LIBVA_DRIVER_NAME,nvidia
env = __GLX_VENDOR_LIBRARY_NAME,nvidia
env = __GL_VRR_ALLOWED,1
env = WLR_NO_HARDWARE_CURSORS,1
env = WLR_DRM_NO_ATOMIC,1


## Grub
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 intremap=off splash button.lid_init_state=open quiet nvidia_drm.modeset=1"

