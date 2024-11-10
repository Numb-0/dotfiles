# Cosix dotfiles
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


## Grub (Razer)
1.Go to /etc/default/grub
2.Add GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 intremap=off splash button.lid_init_state=open quiet nvidia_drm.modeset=1"
3.Run sudo grub-mkconfig -o /boot/grub/grub.cfg

## SSH
### Generating the key and adding it to the agent
1. ssh-keygen -t ed25519 -C "your_email@example.com"
2. eval "$(ssh-agent -s)"
3. ssh-add ~/.ssh/id_ed25519
4. Go to github and add the the pub key using -->
5. cat ~/.ssh/id_ed25519.pub
6. Then to check connection --> ssh -T git@github.com
7. Tip: if git keeps asking username and pass use --> git remote set-url origin git@github.com:UserName/Repo


## Wifi
install network-manager and use the nmtui command to configure your network

## keyswap
1. go to /usr/share/X11/xkb/symbols/  and find the us file
2. modify the us file changing y - z

## Spot
spotify installation path = ~/.local/share/spotify-launcher/install/usr/bin

## Fish Shell
1. echo /usr/local/bin/fish | sudo tee -a /etc/shells #adds fish to shells
2. chsh -s /usr/local/bin/fish # changes default shell

## Autologin from tty
1. Go to /etc/systemd/system/getty@tty1.service.d/
2. Create a file named autologin.conf or override.conf 
3. Add these contents 
``` 
[Service]
ExecStart=
ExecStart=-/sbin/agetty -o '-p -f -- \\u' --noclear --autologin username %I $TERM
```

## Steam games settings
1. Astral Ascent --> SDL_VIDEODRIVER=wayland SDL_DYNAMIC_API=/usr/lib/libSDL2-2.0.so SDL12COMPAT_HIGHDPI=1 SDL12COMPAT_OPENGL_SCALING=0  %command%
2. Cult of The Lamb --> gamemoderun __NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia __VK_LAYER_NV_optimus=NVIDIA_only VK_ICD_FILENAMES=/usr/share/vulkan/icd.d/nvidia_icd.json %command%
