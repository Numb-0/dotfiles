# ZSH Configs ++Numb-0++

# Starts Hyperland if not already started
if [[ -z "$DISPLAY" ]] && [[ "$(tty)" = "/dev/tty1" ]] && ! pgrep -x "Hyprland" > /dev/null; then
    exec Hyprland
fi

# Define plugin installation directory
ZSH_CUSTOM="$HOME/.zsh"

# Function to install a plugin if not already installed
function install_plugin() {
    local plugin_name="$1"
    local plugin_url="$2"
    local plugin_dir="$ZSH_CUSTOM/$plugin_name"

    if [[ ! -d "$plugin_dir" ]]; then
        echo "Installing $plugin_name..."
        git clone "$plugin_url" "$plugin_dir"
        # Source the plugin if it has a .zsh file
        # local source_line="source $plugin_dir/${plugin_name}.zsh"
        # if ! grep -Fxq "$source_line" "$HOME/.zshrc"; then
        #     echo "$source_line" >> "$HOME/.zshrc"
        # fi
    fi
}

# Install plugins
typeset -A plugins
plugins=(
    ["zsh-syntax-highlighting"]="git@github.com:zsh-users/zsh-syntax-highlighting.git"
    ["zsh-autocomplete"]="git@github.com:marlonrichert/zsh-autocomplete.git"
)

for plugin in ${(k)plugins}; do
    install_plugin "$plugin" "${plugins[$plugin]}"
done

# Plugins Settings
# ZSH_AUTOSUGGEST_STRATEGY=( history completion )
# zstyle ':autocomplete:recent-paths:*' list-lines 10
# zstyle ':autocomplete:*' default-context history-incremental-search-backward
# zstyle ':autocomplete:history-search-backward:*' list-lines 2000
ZSH_HIGHLIGHT_HIGHLIGHTERS=( main brackets )
source $ZSH_CUSTOM/zsh-autocomplete/zsh-autocomplete.plugin.zsh
source $ZSH_CUSTOM/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# Install Pure prompt if not already installed
PURE_DIR="$ZSH_CUSTOM/pure"
PURE_URL="https://github.com/sindresorhus/pure.git"

if [[ ! -d "$PURE_DIR" ]]; then
    echo "Installing Pure prompt..."
    git clone --recurse-submodules "$PURE_URL" "$PURE_DIR"
fi

# Setup Prompt
fpath+=($HOME/.zsh/pure)
autoload -U promptinit; promptinit
prompt pure


# In case a command is not found, try to find the package that has it
function command_not_found_handler {
    local purple='\e[1;35m' bright='\e[0;1m' green='\e[1;32m' reset='\e[0m'
    printf 'zsh: command not found: %s\n' "$1"
    local entries=( ${(f)"$(/usr/bin/pacman -F --machinereadable -- "/usr/bin/$1")"} )
    if (( ${#entries[@]} )) ; then
        printf "${bright}$1${reset} may be found in the following packages:\n"
        local pkg
        for entry in "${entries[@]}" ; do
            local fields=( ${(0)entry} )
            if [[ "$pkg" != "${fields[2]}" ]] ; then
                printf "${purple}%s/${bright}%s ${green}%s${reset}\n" "${fields[1]}" "${fields[2]}" "${fields[3]}"
            fi
            printf '    /%s\n' "${fields[4]}"
            pkg="${fields[2]}"
        done
    fi
    return 127
}

# Detect the AUR wrapper
if pacman -Qi yay &>/dev/null ; then
   aurhelper="yay"
elif pacman -Qi paru &>/dev/null ; then
   aurhelper="paru"
fi

function in {
    local pkg="$1"
    if pacman -Si "$pkg" &>/dev/null ; then
        sudo pacman -S "$pkg"
    else 
        "$aurhelper" -S "$pkg"
    fi
}

# Helpful aliases
alias  c='clear ; pokemon-colorscripts --no-title -r' # clear terminal
alias  l='eza -lh' # long list
alias ls='eza -1 -a' # short list
alias ll='eza -lha --sort=name --group-directories-first' # long list all
alias ld='eza -lhD' # long list dirs
alias un='$aurhelper -Rns' # uninstall package
alias up='$aurhelper -Syu' # update system/package/aur
alias pl='$aurhelper -Qs' # list installed package
alias pa='$aurhelper -Ss' # list availabe package
alias pc='$aurhelper -Sc' # remove unused cache
alias po='$aurhelper -Qtdq | $aurhelper -Rns -' # remove unused packages, also try > $aurhelper -Qqd | $aurhelper -Rsu --print -
alias vc='code --ozone-platform-hint=wayland --disable-gpu' # gui code editor
alias tr='tree -a -f -I '.git''
alias trd='tree -a -d'

# Handy change dir shortcuts
alias ..='cd ..'
alias ...='cd ../..'
alias .3='cd ../../..'
alias .4='cd ../../../..'
alias .5='cd ../../../../..'

# Always mkdir a path (this doesn't inhibit functionality to make a single dir)
alias mkdir='mkdir -p'

# Fixes "Error opening terminal: xterm-kitty" when using the default kitty term to open some programs through ssh
alias ssh='kitten ssh'

# Kitty Nvim Padding
alias nvim='kitty @ set-spacing padding=0 && nvim && kitty @ set-spacing padding=default'


# History file location
HISTFILE=~/.zsh_history

# Number of commands to keep in memory and in the history file
HISTSIZE=10000
SAVEHIST=10000

# History options
setopt appendhistory        # Append to history file, rather than overwriting
setopt HIST_IGNORE_DUPS     # Ignore duplicate commands
setopt HIST_IGNORE_SPACE    # Ignore commands starting with space
setopt HIST_REDUCE_BLANKS   # Reduce multiple blanks to a single space

# Adds Sprite pokemon
pokemon-colorscripts --no-title -r

