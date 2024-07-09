import { applauncher } from "./widgets/applauncher.js"
import { Bar } from "./widgets/bar.js"


const scss = `${App.configDir}/scss/style.scss`
const css = `${App.configDir}/tmp/styles.css`
Utils.exec(`sassc ${scss} ${css}`)


App.config({
  style: css,
  icons: './assets',
  gtkTheme: "Adwaita-dark",
  windows: [
    applauncher,
    Bar(),
    Bar(1)
  ],
})
