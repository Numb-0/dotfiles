import { exec, timeout, Variable } from "astal"
import { App, Gdk, Gtk } from "astal/gtk3"
import Bar from "./Widgets/Bar"
import Applauncher from "./Widgets/Applauncher"
import Dashboard, {dashboardVisibleVar} from "./Widgets/Dashboard"

const scss = `${SRC}/scss/style.scss`
const css = `${SRC}/tmp/styles.css`
const icons = `${SRC}/assets`

const toggling = Variable<boolean>(false)

// Try to write scss to css
try {
  const output = exec(`sassc ${scss} ${css}`)
  console.log(output)
} catch (err) {
  console.error(err)
}

App.start({
    icons: icons,
    css: css,
    main() {
      const bars = new Map<Gdk.Monitor, Gtk.Widget>()

      // initialize bars
      for (const gdkmonitor of App.get_monitors()) {
          bars.set(gdkmonitor, Bar(gdkmonitor))
      }

      App.connect("monitor-added", (_, gdkmonitor) => {
          bars.set(gdkmonitor, Bar(gdkmonitor))
      })

      App.connect("monitor-removed", (_, gdkmonitor) => {
          bars.get(gdkmonitor)?.destroy()
          bars.delete(gdkmonitor)
      })

      Dashboard()
      Applauncher()
    },
    // keybindings cotrol
    requestHandler(request: string, res) {
      if (request == "dashboard" && !toggling.get()) {
        if (App.get_window("dashboard")?.visible) {
          toggling.set(true)
          dashboardVisibleVar.set(false)
          timeout(200, () => {toggling.set(false)})
        } else {
          App.toggle_window("dashboard") 
          timeout(200, () => {dashboardVisibleVar.set(true)})
          timeout(200, () => {toggling.set(false)})
        res("Toggled Dashboard")
      }
    }
}})
