import { applauncher } from "./widgets/applauncher.js"
import { Bar } from "./widgets/bar.js"
App.config({
  style: './style.css',
  icons: './assets',
  gtkTheme: "Adwaita-dark",
  windows: [
    applauncher,
    Bar(),
  ],
})
