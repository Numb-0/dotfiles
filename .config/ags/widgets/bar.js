import { Workspaces } from "./components/workspaces.js"
import { Battery } from "./components/battery.js"
import { Media } from "./components/media.js"
import { SysTray } from "./components/systray.js"
import { Network } from "./components/network.js"
import { Bluetooth } from "./components/bluetooth.js"

const notifications = await Service.import("notifications")

const date = Variable("", {
    poll: [1000, 'date "+%H:%M:%S %b %e"'],
})

function Clock() {
    return Widget.Label({
        class_name: "clock",
        label: date.bind(),
    })
}

// This here until bug fix since it throws error but load them anyway
App.addIcons(`${App.configDir}/assets`)

function Logo() {
  return Widget.Icon({
    icon: "Logo-symbolic",
    class_name: "logo",
  })
}


function Notification() {
    const popups = notifications.bind("popups")
    return Widget.Box({
        class_name: "notification",
        visible: popups.as(p => p.length > 0),
        children: [
            Widget.Icon({
                icon: "preferences-system-notifications-symbolic",
            }),
            Widget.Label({
                label: popups.as(p => p[0]?.summary || ""),
            }),
        ],
    })
}

// layout of the bar
function Left() {
    return Widget.Box({
        hpack: "start",
        spacing: 8,
        children: [
            Logo(),
            Workspaces(),
        ],
    })
}

function Center() {
    return Widget.Box({
        spacing: 8,
        children: [
            Media(),
            //Notification(),
        ],
    })
}

function Right() {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
          //Bluetooth(),
          Clock(),
          Network(),
          Battery(),
          SysTray(),
        ],
    })
}

export function Bar(monitor = 0) {
    return Widget.Window({
        name: `bar-${monitor}`, // name has to be unique
        monitor,
        anchor: ["top", "left", "right"],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            class_name: "bar",
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right(),
        }),
    })
}
