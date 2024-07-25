const hyprland = await Service.import("hyprland")

// Util function
function range(length = 6, start = 1) {
    return Array.from({ length }, (_, i) => i + start);
}

export function Workspaces() {
  // I use max 5 workspaces
  const ws = 5
  const workspaces = range(ws || 20).map(id => Widget.Button({
    vpack: "center",
    hpack: "fill",
    attribute: id,
    on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
    setup: self => {self.hook(hyprland, ()=>{
      self.toggleClassName("active", hyprland.active.workspace.id === id)
      self.toggleClassName("occupied", (hyprland.getWorkspace(id)?.windows || 0) > 0)
      })}
    })
  )
  return Widget.Box({
    spacing: 4,
    class_name: "workspaces",
    children: workspaces,  
  })
}



