const mpris = await Service.import("mpris")

export function Media() {
  const label_text = Utils.watch("", mpris, "player-changed", () => {
    const spotify_player = mpris.getPlayer("spotify")
    if (spotify_player && spotify_player.play_back_status != "Stopped") {
        const { track_artists, track_title } = spotify_player
        return `${track_artists.join(", ")} - ${track_title}`
    } else {
        return ""
    }
  })
  
  const label = Widget.Label({label: label_text})
    .hook(mpris, self => { self.label = "" }, "player-closed")

  function getIcon() {
    return `${mpris.getPlayer("spotify")?.play_back_status}-symbolic`
  } 

  function getIconSize() {
    return mpris.getPlayer("spotify")?.play_back_status == null ? 15 : 10
  }

  const icon = Widget.Icon({
    size: Utils.watch(getIconSize(), mpris, getIconSize),
    icon: Utils.watch(getIcon(), mpris, getIcon),
  })

  const box = Widget.Box({
    spacing: 4,
    className: "media",
    children: [icon, label],
  })

  return Widget.EventBox({
      on_primary_click: () => mpris.getPlayer("")?.playPause(),
      on_scroll_up: () => mpris.getPlayer("")?.next(),
      on_scroll_down:() => mpris.getPlayer("")?.previous(),
      child: box,
  })
}
