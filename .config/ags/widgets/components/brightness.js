import brightness from "./../services/brightnessService.js"

export function Brightness() {

  const label = Widget.Label({
    label: brightness.bind("screen_value").as(b => `${Math.round(b * 100)}%`),
  })//.hook(brightness, self => self.label = `${Math.round(brightness.screen_value * 100)}%`, "screen-changed")
  
  const icon = Widget.Icon({
    icon: "dialog-information-symbolic",
    size: 15,
  })

  const box = Widget.Box({
    children:[icon, label],
  })

  const eventbox = Widget.EventBox({
    on_scroll_up: () => brightness.screen_value = brightness.screen_value + 0.02,
    on_scroll_down: () => brightness.screen_value = Math.max(0, brightness.screen_value - 0.02),
    child: box,
  })
    
  return Widget.Box({
    class_name: "brightness",
    child: eventbox,
  })
}
