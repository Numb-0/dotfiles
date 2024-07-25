import { applauncher } from "./widgets/applauncher.js"
import { dashboard } from "./widgets/dashboard.js"
import { Bar } from "./widgets/bar.js"

const hyprland = await Service.import("hyprland")


const scss = `${App.configDir}/scss/style.scss`
const css = `${App.configDir}/tmp/styles.css`
Utils.exec(`sassc ${scss} ${css}`)

const Bars = () => {
  if (hyprland.monitors.length === 2) {
    return [Bar(), Bar(1)];
  } else {
    return [Bar()];
  }
}

App.config({
  style: css,
  icons: './assets',
  gtkTheme: "Adwaita-dark",
  windows: [
    applauncher,
    dashboard,
    ...Bars(),
  ],
})
