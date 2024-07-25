const network = await Service.import('network')


export function Network() {
  const WifiIndicator = Widget.Icon({icon: network.wifi.bind("icon_name")})

  const WiredIndicator = Widget.Icon({icon: network.wired.bind("icon_name")})

  const stack = Widget.Stack({
    children: {
        wifi: WifiIndicator,
        wired: WiredIndicator,
    },
    shown: network.bind('primary').as(p => p || 'wifi'),
  })

  // const menu = Widget.Menu({
  //   children: [
  //     Widget.MenuItem({
  //       child: Widget.Label("test")
  //     })
  //   ],
  // })


  const box = Widget.Box({
    class_name: "network",
    children: [stack],
  })


  return Widget.EventBox({
    child: box,
    //on_primary_click: (_, event) => { menu.popup_at_pointer(event) }
  })
}
