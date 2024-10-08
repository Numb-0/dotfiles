import { App, exec, Gtk, Gdk } from "astal"
import Bar from "./widget/Bar"
import Applauncher from "./widget/Applauncher"
import Dashboard, {dashboardVisibleVar} from "./widget/Dashboard"

const scss = `${SRC}/scss/style.scss`
const css = `${SRC}/tmp/styles.css`
const icons = `${SRC}/assets`

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
      if (request == "dashboard")
        dashboardVisibleVar.set(!dashboardVisibleVar.get())
        res("Toggled Dashboard")
    },
})
