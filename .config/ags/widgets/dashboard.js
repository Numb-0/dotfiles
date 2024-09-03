import { Brightness_Slider } from "./components/dashboard/brightness_slider.js"
import { Volume_Slider } from "./components/dashboard/volume_slider.js"
import { Bluetooth_Selector } from "./components/dashboard/bluetooth_selector.js"

const WINDOW_NAME = "dashboard"

const Left_box = Widget.CenterBox({
  spacing: 4,
  vertical: true,
  css: "background-color: transparent; margin: 5px;",
  centerWidget: Volume_Slider(),

})

const Right_box =  Widget.CenterBox({
  spacing: 4,
  css: "background-color: transparent; margin: 5px;",
  vertical: true,
  startWidget: Bluetooth_Selector(),
  centerWidget: Brightness_Slider(),
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
