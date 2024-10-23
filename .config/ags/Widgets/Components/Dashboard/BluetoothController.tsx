import Bluetooth from "gi://AstalBluetooth";
import { Gtk } from "astal/gtk3";
import { bind, timeout, Variable } from "astal";
import ToggleArrow, { arrow_open, rotateArrow }  from "../Utils/ToggleArrow";
import { Spinner } from "../Utils/Astalified/Spinner";

export default function BluetoothController() {

    const bluetooth = Bluetooth.get_default()
    const revealer_visible = Variable<boolean>(false)
    
    // Custom Icons
    const custom_icons: { [key: string]: string } = {
        "audio-headset": "CustomHeadPhones-symbolic",
    }

    const handler = {
        get: function(target: { [key: string]: string }, prop: string) {
            return prop in target ? target[prop] : prop;
        }
    };
    
    const customIconsProxy = new Proxy(custom_icons, handler);

    // Device List
    const device_discovery = bind(bluetooth, "devices").as(devices => devices
        .filter(device => device.name && device.icon)
        .sort((a, b) => {
            if (a.connected && !b.connected) return -1;
            if (!a.connected && b.connected) return 1;
            if (a.paired && !b.paired) return -1;
            if (!a.paired && b.paired) return 1;
            return 0;
        })
        .map(device => <DeviceButton device={device}/> ))

    function update_device_list() {
        if (!bluetooth.adapter.discovering && bluetooth.adapter.powered) {
            bluetooth.adapter.start_discovery()
            timeout(1000, () => bluetooth.adapter.stop_discovery())
        }
    }

    // Device Button
    function DeviceButton({device}: {device: Bluetooth.Device}): JSX.Element {
        return <button onClicked={() => toggle_device(device)} className={bind(device, "connected").as(c => c ? "connected" : "")}>
            <box spacing={2}>
                <icon icon={customIconsProxy[device.get_icon()]} css={"font-size: 15px; padding-right:2px;"}/>
                <label label={device.get_name().split(" ")[0]}/>
            </box>
        </button>
    }

    function toggle_device(device: Bluetooth.Device) {
        if (!device.paired) {
            device.trusted = true
            device.pair()
            device.connect_device(null)
        } else if (!device.connected) {
            device.connect_device(null)
        } else if (device.connected) {
            device.disconnect_device(null)
        }
    }

    return  <box className={"bluetooth"}>
                <box vertical={true}>
                    <box halign={Gtk.Align.START}>
                        <button onClicked={() => bluetooth.toggle()}>
                            <icon css={"padding-left: 5px; padding-right: 5px;"} icon={bind(bluetooth.adapter, "powered").as((powered) => powered ? "bluetooth-symbolic" : "bluetooth-disabled-symbolic")}/>
                        </button>
                        <button onClick={()=>{
                            rotateArrow(); 
                            revealer_visible.set(!arrow_open.get())
                            }}>
                            <box spacing={4}>
                                <label css={"padding-top: 3px"} label="Bluetooth"/>
                                <ToggleArrow/>
                            </box>
                        </button>
                        <button onClicked={() => update_device_list()}>
                            <stack visibleChildName={bind(bluetooth.adapter, "discovering").as((d) => (d ? "Spinner" : "Arrow"))}>
                                <icon css={"padding-top:1px; padding-left: 1px"} name={"Arrow"} icon={"RefreshArrow-symbolic"}/>
                                <Spinner name={"Spinner"} active={true}/>
                            </stack>
                        </button>
                    </box>
                    <revealer revealChild={revealer_visible()}>
                        <box vertical={true} className={"buttonbox"}>
                            {device_discovery}
                        </box>
                    </revealer>
                </box>
            </box>
}