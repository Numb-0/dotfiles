import Network from "gi://AstalNetwork"
import { bind } from "astal"


export default function Wifi() {
    const { wifi } = Network.get_default()

    return  <button className={"network"} onClick={() => wifi.set_enabled(!wifi.enabled)}>
                <icon
                //tooltipText={bind(wifi, "ssid").as(String)}
                icon={bind(wifi, "iconName")}/>
            </button>
}