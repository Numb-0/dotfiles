const bluetooth = await Service.import('bluetooth')


export function Bluetooth() {

  const icon = Widget.Icon({
      icon: bluetooth.bind('enabled').as(on =>
          `bluetooth-${on ? 'active' : 'disabled'}-symbolic`),
  })
  
  const connectedList = Widget.Box({
    setup: self => self.hook(bluetooth, self => {
        self.children = bluetooth.connected_devices
            .map(({ icon_name, name }) => Widget.Box([
                Widget.Icon(icon_name + '-symbolic'),
                Widget.Label(name),
            ]));

        self.visible = bluetooth.connected_devices.length > 0;
    }, 'notify::connected-devices'),
  })
  
  const menu_list = Widget.MenuItem({
    child: connectedList,
  })

  // const devices = Widget.Box({
  //   setup: self => self.hook(bluetooth, self => {
  //     self.children = bluetooth.devices
  //     .map(({icon_name, name}) => Widget.Box([
  //       Widget.Icon(icon_name + '-symbolic'),
  //       Widget.Label(name),
  //     ]))
  //   }, "device-added"),
  // })

  const devices = Widget.Box({
  setup: self => self.hook(bluetooth, self => {
    if (bluetooth.devices) {
      console.log("Bluetooth devices:", bluetooth.devices);
      self.children = bluetooth.devices
        .filter(({ name }) => name)
        .map(({icon_name, name}) => Widget.Box([
          Widget.Icon(icon_name + '-symbolic'),
          Widget.Label(name),
        ]));
    } else {
      console.warn("No Bluetooth devices found");
    }
  }, "device-added"),
});


  const menu_devices = Widget.MenuItem({
    child: devices,
    on_activate: () =>{if (devices[0]){ devices[0].setConnection(1) }},
  })

  const menu_toggle = Widget.MenuItem({
    child: Widget.Label("Toggle"),
    on_activate: () => { 
      bluetooth.toggle()
      if (bluetooth.enabled) {
        Utils.execAsync(['bluetoothctl', '--timeout', '20', 'scan', 'on'] )
      }
    }
  })

  const menu = Widget.Menu({
    children: [menu_toggle, menu_devices, menu_list],
  })

  const box = Widget.Box({
    children: [icon],
  })

  return Widget.EventBox({
    class_name: "bluetooth",
    child: box,
    on_primary_click: (_, event) => { menu.popup_at_pointer(event) }
  })
}

