import { App, Variable, Astal, Gtk,Gdk } from "astal"
import Workspaces from "./components/Workspaces"
import Volume from "./components/Volume"
import Battery_ from "./components/Battery"
import SysTray from "./components/SysTray"
import Wifi from "./components/WifiInfos"
import FocusedClient from "./components/FocusedClient"

const time = Variable<string>("").poll(1000, "date")

export default function Bar(gdkmonitor: Gdk.Monitor) {
    return <window
        className="bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        application={App}
        marginTop={4}
        marginBottom={2}
        marginLeft={4}
        marginRight={4}>
        <centerbox>
            <box halign={Gtk.Align.START} >
                <icon className={"logo"} icon={"Logo-symbolic"} iconSize={50} />
                <Workspaces />
                
            </box>
            <label label={"time"} halign={Gtk.Align.CENTER} />
            <box halign={Gtk.Align.END} spacing={4}>
                <Wifi />
                <Battery_ />
                <Volume />
                <SysTray />
            </box>
        </centerbox>
    </window>
}
