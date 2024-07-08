const audio = await Service.import("audio")

export function Volume() {
    const icons = {
        101: "overamplified",
        67: "high",
        34: "medium",
        1: "low",
        0: "muted",
    }

    function getIcon() {
        const icon = audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
            threshold => threshold <= audio.speaker.volume * 100)

        return `audio-volume-${icons[icon]}-symbolic`
    }

    function getLabel() {
        return `${Math.round(audio.speaker.volume * 100)}%`
    }
    
    const label = Widget.Label({
        label: Utils.watch(getLabel(), audio.speaker, getLabel),
    })

    const icon = Widget.Icon({
        icon: Utils.watch(getIcon(), audio.speaker, getIcon),
    })

    function volume_down() {
        audio.speaker.volume = Math.max(0, audio.speaker.volume - 0.05)
    }

    function volume_up() { 
        // Can go up to 1.5
        // This limits volume to 100%  
        if (audio.speaker.volume < 0.99){
          audio.speaker.volume = audio.speaker.volume + 0.05
        }
    } 
       
    return Widget.EventBox({
        child: Widget.Box({
          class_name: "volume",
          children: [icon,label],
        }),
        on_scroll_up: volume_up,
        on_scroll_down: volume_down,
    })
}

