
const WINDOW_NAME = "dashboard"

const Dashboard = () => {
  return Widget.Box({
    child: Widget.Button({
      child: Widget.Label({}),
    }),
    css: "background-color: blue;"
  })
}


  

export const dashboard = Widget.Window({
  name: WINDOW_NAME,
  setup: self => self.keybind("Escape", () => {
    App.closeWindow(WINDOW_NAME)
  }),
  visible: false,
  keymode: "exclusive",
  anchor: ["top", "right"],
  margins: [10,10,0,0],
  child:Dashboard(),
})
