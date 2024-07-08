const hyprland = await Service.import("hyprland")

//export function Workspaces() {
//    const workspaces = hyprland.bind("workspaces")
//        .as(ws => ws.map(({ id }) => Widget.Button({
//            attribute: id,
//            on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
//            child: Widget.Label({label:`${id}`,css:"font-size:0;"}),
//            setup: self => {self.hook(hyprland, ()=>{
//              self.toggleClassName("active", hyprland.active.workspace.id === id)
//              self.toggleClassName("occupied", (hyprland.getWorkspace(id)?.windows || 0) > 0)
//    })}          
//  })))
//
//    return Widget.Box({
//        spacing:8,
//        css: "padding:10px;",
//        class_name: "workspaces",
//        children: workspaces,
//    })
//}
function range(length, start = 1) {
    return Array.from({ length }, (_, i) => i + start);
}

export function Workspaces() {
    const ws = 7
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



