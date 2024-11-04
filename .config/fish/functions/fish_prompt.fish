function fish_prompt
    set -g __fish_git_prompt_show_informative_status 1
    set -g __fish_git_prompt_use_informative_chars 0
    set -g __fish_git_prompt_color blue
    set -g __fish_git_prompt_color_cleanstate green
    set -g __fish_git_prompt_color_merging red 
    
    set -l last_status $status
    set -l arrow ' ➤ '
    set -l show_status 

    if test $last_status -ne 0
        set arrow (set_color red) $arrow (set_color normal)
        set show_status (set_color red)" [$last_status]"(set_color normal)
    end

    string join "" -- (set_color yellow) (prompt_pwd --full-length-dirs 2) (set_color normal) (fish_git_prompt) $show_status (set_color purple) $arrow
end

