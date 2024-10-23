import Hyprland from "gi://AstalHyprland"
import { bind } from "astal"
import { Gtk } from "astal/gtk3"

const hyperland = Hyprland.get_default();

export default function Workspaces() {
    const ws = 5;
    const workspaces = Array.from({ length: ws }, (_, i) => i + 1);
    
    function WorkspaceButton({workspace}: {workspace: number}): JSX.Element {
        const currentWorkspace = () => hyperland.get_focused_workspace().get_id();
        return (
            <button
                setup={(self)=> {self.hook(hyperland, "event",(self, event) => {
                    self.toggleClassName("active", workspace === currentWorkspace())
                    self.toggleClassName("occupied", hyperland.get_workspace(workspace)?.get_clients().length > 0)
                })}} 
                onClicked={() => hyperland.message_async(`dispatch workspace ${workspace}`)}
                halign={Gtk.Align.CENTER}>
            </button>
        );
    }

    const workspaceButtons = workspaces.map((workspace) => (
        <WorkspaceButton workspace={workspace} />
    ));

    return  <box className={"workspaces"} spacing={4}>
                {workspaceButtons}
            </box>
}

function Worksasdsapaces() {
    const hypr = Hyprland.get_default()

    return <box className="workspaces" spacing={4}>
        {bind(hypr, "workspaces").as(wss => wss
            .sort((a, b) => a.id - b.id)
            .map(ws => (
                <button
                //setup={(self) => self.toggleClassName("occupied", hyperland.get_workspace(ws.id)?.get_clients().length > 0)}
                    className={bind(hypr, "focusedWorkspace").as(fw =>
                        ws === fw ? "active" : "occupied")}
                    onClicked={() => ws.focus()}>
                </button>
            ))
        )}
    </box>
}