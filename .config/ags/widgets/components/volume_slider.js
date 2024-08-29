const audio = await Service.import("audio")


export function Volume_Slider() {
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

  const icon = Widget.Icon({
      icon: Utils.watch(getIcon(), audio.speaker, getIcon),
  })
  
  const slider = Widget.Slider({
    hexpand: true,
    drawValue: false,
    onChange: ({ value }) => audio["speaker"].volume = value,
    value: audio["speaker"].bind('volume'),
  })

  return Widget.Box({
    class_name: "volume_slider",
    homogeneous: false,
    vertical: false,
    children: [icon, slider]
  })
}
