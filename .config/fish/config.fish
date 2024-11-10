fish_config theme choose "Macchiato"

set -x PATH "$HOME/.local/bin:$PATH"
set -e ANDROID_SDK_ROOT

# Lauches Hyprland on startup
if test (tty) = "/dev/tty1"
    exec Hyprland
end

abbr --add dotdot --regex '^\.\.+$' --function multicd
abbr --add mkdir mkdir -p
abbr --add clr 'clear ;pokemon-colorscripts --no-title -r'
abbr --add ssh kitten ssh
abbr --add tr 'tree -a -f -I '.git''
abbr --add trd 'tree -a -d'
abbr --add l 'eza -lh'
abbr --add ls 'eza -1 -a'
abbr --add ld 'eza -lhD'

