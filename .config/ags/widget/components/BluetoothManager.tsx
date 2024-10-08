import Bluetooth from "gi://AstalBluetooth";
import { bind, Variable } from "astal";

export default function BluetoothManager() {

    const bluetooth = Bluetooth.get_default()

    const list_visible = Variable(false);

    const button_label = Variable("Bluetooth");

    function getBluetoothIcon() {
        if (bluetooth.get_is_powered()) {
            return "bluetooth-symbolic";
        } else {
            return "bluetooth-disabled-symbolic";
        }
    }

    type BluetoothButtonProps = {
        device: Bluetooth.Device
    }

    function BluetoothButton({device}: BluetoothButtonProps): JSX.Element {
        return  <button>
                    <box>
                        <icon icon={device.get_icon()}/>
                        <label label={device.get_name()}/>
                    </box>
                </button>
    }

    function BluetoothDeviceList() {
        const devices = bluetooth.get_devices();
        return  <box>
                    {devices.map(device => <BluetoothButton device={device}/>)}
                </box>
    }

    function InitialBluetoothButton() {
        return <button 
            className={"bluetooth_button"}
            onClick={()=>{
                list_visible.set(!list_visible.get())
            }}>
                    <box spacing={6}>
                        <icon icon={getBluetoothIcon()}/>
                        <label label={button_label()}/>
                    </box>
                </button>
    }


    function BluetoothRevealer() {
        return  <revealer revealChild={list_visible()}>
                    <BluetoothDeviceList/>
                </revealer>
    }




    return <box vertical={true}>
        <InitialBluetoothButton/>
        <BluetoothRevealer/>
    </box>
}