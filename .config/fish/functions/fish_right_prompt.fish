function fish_right_prompt 
    set -l time_counter "$CMD_DURATION ms" 
    string join "" -- (set_color blue) "[$time_counter]"
end
