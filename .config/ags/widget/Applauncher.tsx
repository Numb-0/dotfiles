import Apps from "gi://AstalApps";
import Hyprland from "gi://AstalHyprland"
import { Widget, App, Astal, Gtk } from "astal"

const hyprland = Hyprland.get_default()

const apps = new Apps.Apps({
    includeEntry: true,
    includeExecutable: true,
});

export default function Applauncher() {
    
    // Get all apps infos
    const appList = apps.fuzzy_query("");

    type AppButtonProps = {
        app: Apps.Application
    };

    function AppButton({app}: AppButtonProps): JSX.Element {
        return (
            <button name={app.get_name()} 
            onClicked={() => {
                app.launch();
                App.toggle_window("Applauncher");
            }}>
                <box>
                    <icon icon={app.get_icon_name() || ""} iconSize={40}/>
                    <label label={app.get_name()} xalign={0} truncate={true} valign={Gtk.Align.CENTER}/>
                </box>
            </button>
        );
    }

    const appButtons = appList.map((app) => (
        <AppButton app={app} />
    ));

    function filterList(text: string) {
        appButtons.forEach((appButton) => {
            const appName = appButton.name.toLowerCase();
            const isVisible = appName.includes(text.toLowerCase());
            appButton.visible = isVisible;
        });
    }
    
    return <window exclusivity={Astal.Exclusivity.EXCLUSIVE}
                keymode={Astal.Keymode.ON_DEMAND} 
                name={"Applauncher"} 
                application={App} 
                className={"applauncher"} 
                monitor={hyprland.get_focused_monitor().id}
                onKeyPressEvent={(window, event) => 
                    // Closes applauncher when Esc is pressed
                    event.get_keycode()[1] === 9 && window.hide()
                }
                setup={(self) => {
                    // Moves to screen with mouse focus
                    self.hook(hyprland, "notify", (self) => {self.monitor = hyprland.get_focused_monitor().id;});
                }}>
            <box vertical={true}>
                <entry hexpand={true} placeholderText={"Search App"} isFocus={true}
                        onChanged={(self)=> {
                            filterList(self.get_text());
                        }}
                        onActivate={(self) => {
                            const selectedApp  = appButtons.find((appButton) => appButton.visible);
                            // Launch the selected app
                            selectedApp?.activate();
                            self.text = "";
                        }}
                        setup={(self) => {
                            self.hook(App, "notify", (self) => {
                                // Retakes focus when lauching app for next search
                                self.grab_focus_without_selecting()
                                // reset text on app launch
                                if (App.get_window("Applauncher")?.is_visible())
                                    self.text = "";
                            });
                }}/>
                <scrollable className={"scrollable"} hscroll={Gtk.PolicyType.NEVER} >
                    <box vertical={true} spacing={4}>
                        {appButtons}
                    </box>
                </scrollable>
            </box>
        </window>
}
