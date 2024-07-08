const battery = await Service.import("battery")

export function Battery() {
    return Widget.Box({
        class_name: "battery",
        visible: battery.bind("available"),
        children: [
            Widget.Icon({icon: battery.bind("icon_name")}),
            Widget.Label({
              label: battery.bind("percent").as(p => `${p}%`)
            }),
        ],
    })
}
