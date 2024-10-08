import { App, Variable, Astal, Gtk} from "astal"
import Hyprland from "gi://AstalHyprland"
import VolumeSlider from "./components/VolumeSlider";
import BluetoothManager from "./components/BluetoothManager";


const hyprland = Hyprland.get_default()

export const dashboardVisibleVar = Variable<boolean>(true)

export default function Dashboard() {
  return <window exclusivity={Astal.Exclusivity.EXCLUSIVE}
                anchor = {Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
                keymode={Astal.Keymode.EXCLUSIVE} 
                name={"dashboard"} 
                className={"dashboard"}
                application={App} 
                monitor={hyprland.get_focused_monitor().id}
                //onKeyPressEvent={(window, e) => e.get_keycode()[1] === 9 && window.hide() }
                marginTop={4}
                marginRight={4}
                visible={true}
                setup={(self) => {
                    // Moves to screen with mouse focus
                    self.hook(hyprland, "notify", (self) => {
                      if (self.monitor != hyprland.get_focused_monitor().id)
                        self.monitor = hyprland.get_focused_monitor().id
                    });
                }}>
                <revealer revealChild={dashboardVisibleVar()} transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
                  <box className={"dashboard_box"} vertical={true} vexpand={true}>
                    <VolumeSlider/>
                    <BluetoothManager/>
                  </box>
                </revealer>
          </window>
}
