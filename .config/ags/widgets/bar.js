import { Workspaces } from "./components/workspaces.js"
import { Volume } from "./components/volume.js"
import { Battery } from "./components/battery_widget.js"
import { SpotMedia} from "./components/spot_media.js"

const notifications = await Service.import("notifications")
const systemtray = await Service.import("systemtray")

const date = Variable("", {
    poll: [1000, 'date "+%H:%M:%S %b %e"'],
})

function Clock() {
    return Widget.Label({
        class_name: "clock",
        label: date.bind(),
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


function SysTray() {
    const items = systemtray.bind("items")
        .as(items => items.map(item => Widget.Button({
            class_name: "sys_items",
            child: Widget.Icon({icon: item.bind("icon") }),
            on_primary_click: (_, event) => item.activate(event),
            on_secondary_click: (_, event) => item.openMenu(event),
            tooltip_markup: item.bind("tooltip_markup"),
        })))

    return Widget.Box({
        children: items,
    })
}


// layout of the bar
function Left() {
    return Widget.Box({
        spacing: 8,
        children: [
            Workspaces(),
        ],
    })
}

function Center() {
    return Widget.Box({
        spacing: 8,
        children: [
            SpotMedia(),
            //Notification(),
        ],
    })
}

function Right() {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            Clock(),
            Volume(),
            Battery(),
            SysTray(),
        ],
    })
}

export function Bar(monitor = 0) {
    return Widget.Window({
        name: `bar-${monitor}`, // name has to be unique
        class_name: "bar",
        monitor,
        anchor: ["top", "left", "right"],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right(),
        }),
    })
}
