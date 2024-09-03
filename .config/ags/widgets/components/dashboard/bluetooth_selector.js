const bluetooth = await Service.import('bluetooth')

export function Bluetooth_Selector() {

  const Bluetooth_Item = dev => Widget.Button({
    on_clicked: () => {
      // Works
      dev.setConnection(true)
      bt_button_label.label = dev.name
      bt_revealer.reveal_child = false
    },
    attribute: { dev },
    class_name: "bluetooth_entry",
    child: Widget.Box({
      hexpand: true,
      children:[
        Widget.Icon({
          icon: dev.icon_name + "-symbolic" || "",
        }),
        Widget.Label({
            label: dev.name,
            xalign: 0,
            vpack: "center",
            truncate: "end",
        }),
      ],
    })
  })
  
  const bt_item_list = Widget.Box({
    vertical: true,
    children: bluetooth.devices.map(Bluetooth_Item),
  }).hook(bluetooth,() => populate(), "device-added") 

  function populate() {
    bt_item_list.children = bluetooth.devices.map(Bluetooth_Item)
  }


  const bt_revealer = Widget.Revealer({
    transition: "slide_down",
    child: Widget.Box({
      vertical: true, 
      children: [bt_item_list],
    })
  })

  const bt_button_label = Widget.Label({label: "Hello", xalign: 0, vpack: "center", truncate: "end",})
  
  const bt_button = Widget.Button({
    class_name: "bluetooth_button",
    hexpand: true,
    child: Widget.Box({
      children: [
        Widget.Icon({icon: bluetooth.bind('enabled').as(on => `bluetooth-${on ? 'active' : 'disabled'}-symbolic`)}),
        bt_button_label,
      ]
    }),
    on_clicked: () => bt_revealer.reveal_child = !bt_revealer.reveal_child 
  })


  return Widget.Box({
    vertical: true,
    children: [bt_button, bt_revealer],
  })
}
