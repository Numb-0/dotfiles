import { Variable, timeout} from "astal"
import { App, Astal, Gtk, Gdk} from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import VolumeSlider from "./Components/Dashboard/VolumeSlider";
import BluetoothController from "./Components/Dashboard/BluetoothController";



export const dashboardVisibleVar = Variable<boolean>(true)

export default function Dashboard() {

  const hyprland = Hyprland.get_default()

  return <window exclusivity={Astal.Exclusivity.EXCLUSIVE}
                anchor = {Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.BOTTOM}
                keymode={Astal.Keymode.EXCLUSIVE} 
                name={"dashboard"} 
                className={"dashboard"}
                application={App}
                monitor={hyprland.get_focused_monitor().id}
                onKeyPressEvent={(_, e) => e.get_keycode()[1] === 9 && dashboardVisibleVar.set(false)}
                marginTop={4}
                marginRight={4}
                visible={true}
                setup={(self) => {
                  dashboardVisibleVar.subscribe(v => {
                    if (!v) {
                      timeout(200, () => self.hide())
                    }
                  })
                  // Moves to screen with mouse focus
                  self.hook(hyprland, "notify", (self) => {
                    if (self.monitor != hyprland.get_focused_monitor().id)
                      self.monitor = hyprland.get_focused_monitor().id
                  });
                }}>
                <revealer halign={Gtk.Align.END} valign={Gtk.Align.START} revealChild={dashboardVisibleVar()} transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
                  <box className={"dashboard_box"} vertical={true} vexpand={true}>
                    <VolumeSlider/>
                    <BluetoothController/>
                  </box>
                </revealer>
          </window>
}
