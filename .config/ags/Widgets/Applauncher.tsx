import Apps from "gi://AstalApps";
import Hyprland from "gi://AstalHyprland"
import { App, Astal, Gtk } from "astal/gtk3"
import { FlowBox } from "./Components/Utils/Astalified/FlowBox";
import { FlowBoxChild } from "./Components/Utils/Astalified/FlowBoxChild";

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
        return <FlowBoxChild tooltipText={app.name} className={"appbutton"} name={app.name} 
                    onActivate={(self) => {
                    app.launch();
                    App.toggle_window("Applauncher");
                    if(self.is_selected()) self.set_state(Gtk.StateType.NORMAL);
                    }}
                    onFocusOutEvent={(self) => {
                        self.set_state(Gtk.StateType.NORMAL);
                    }
                }>
                    <box>
                        <icon icon={app.get_icon_name() || ""}/>
                    </box>
                </FlowBoxChild>
    }

    const appButtons = appList.map((app) => (
        <AppButton app={app} />
    ));

    function filterList(text: string) {
        appButtons.forEach((appButton) => {
            const appName = appButton.name.toLowerCase();
            const isVisible = appName.includes(text.toLowerCase());
            appButton.set_visible(isVisible);
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
                            self.hook(App, "window-toggled", (self) => {
                                // Retakes focus when lauching app for next search
                                self.grab_focus()
                                // reset text on app launch
                                if (App.get_window("Applauncher")?.is_visible())
                                    self.text = "";
                            });
                }}/>
                <scrollable className={"scrollable"} hscroll={Gtk.PolicyType.NEVER}>
                    <FlowBox activateOnSingleClick={true} homogeneous={true} selectionMode={Gtk.SelectionMode.SINGLE} min_children_per_line={4} >
                        {appButtons}
                    </FlowBox>
                </scrollable>
            </box>
        </window>
}
