const mpris = await Service.import("mpris")

export function SpotMedia() {
    const label = Utils.watch("", mpris, "player-changed", () => {
        if (mpris.players[0] && mpris.getPlayer("spotify")) {
            const { track_artists, track_title } = mpris.players[0]
            return `${track_artists.join(", ")} - ${track_title}`
        } else {
            return ""
        }
    })

    function getIcon() {
      return `${mpris.getPlayer("spotify")?.play_back_status}-symbolic`
    } 

    const icon = Widget.Icon({
      css: "margin-right:3px;margin-bottom:5px;",
      size:10,
      icon: Utils.watch(getIcon(), mpris, getIcon),
    })

    const box = Widget.Box({
      children: [icon,
      Widget.Label({ label }).hook(mpris, self => {
        self.label = ""
      },"player-closed")]
    })

    return Widget.Button({
        class_name: "spotmedia",
        on_primary_click: () => mpris.getPlayer("")?.playPause(),
        on_scroll_up: () => mpris.getPlayer("")?.next(),
        on_scroll_down:() => mpris.getPlayer("")?.previous(),
        child: box,
    })
}
