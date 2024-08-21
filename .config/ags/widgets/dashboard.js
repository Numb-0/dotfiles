import { Volume } from "./components/volume.js"
import { Brightness } from "./components/brightness.js"

const WINDOW_NAME = "dashboard"

const Left_box = Widget.Box({
  vertical: true,
  css: "background-color: transparent;",
  children: [Volume(),],
})

const Right_box =  Widget.Box({
  css: "background-color: transparent;",
  vertical: true,
  children: [Brightness(),],
})

const Dashboard = () => {
  return Widget.Box({
    class_name: "dashboard",
    vertical: false,
    homogeneous: true,
    spacing: 4,
    children: [Left_box, Right_box],
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
  margins: [5,5,0,0],
  css: "background-color: transparent;",
  child: Dashboard(),
})
