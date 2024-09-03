import brightness from "./../../services/brightnessService.js"

export function Brightness_Slider() {

  const slider = Widget.Slider({
    hexpand: true,
    drawValue: false,
    onChange: ({ value }) => brightness.screen_value = value,
    value: brightness.bind("screen_value"),
  })


  const icon = Widget.Icon({
    icon: "brightness-low-symbolic",
    size: 25,
  })

  return Widget.Box({
    homogeneous: false,
    vertical: false,
    class_name: "brightness_slider",
    children:[icon, slider],
  })    
}
