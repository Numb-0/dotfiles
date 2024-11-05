fish_config theme choose "Catpuccin"

set -x PATH "$HOME/.local/bin:$PATH"
set -e ANDROID_SDK_ROOT

if test (tty) = "/dev/tty1"
    exec Hyprland
end

function multicd
    echo cd (string repeat -n (math (string length -- $argv[1]) - 1) ../)
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

