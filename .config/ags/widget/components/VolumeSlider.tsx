import { Widget, bind } from "astal"
import Wp from "gi://AstalWp";

export default function VolumeSlider() {

  const speaker = Wp.get_default()?.audio.defaultSpeaker!

  return <box className={"volume_slider"}>
          <icon icon={bind(speaker, "volumeIcon")} />
          <slider hexpand={true} drawValue={false}
            value={bind(speaker, "volume")}
            onDragged={({value})=> speaker.volume = value }
            />
         </box>
}
