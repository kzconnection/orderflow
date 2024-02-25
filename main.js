import "./style.css";
import { NightVision } from "night-vision";
import VolumeSummary from "./volumeSummary.navy"
import Imbalance from "./imbalance.navy"
import { DataLoader } from "./dataLoader.js";

document.querySelector("#app").innerHTML = `
<style>
body {
    background-color: #0c0d0e;
}
</style>
<div id="chart-container"></div>
`;

let chart = new NightVision("chart-container", {
  autoResize: true,
  colors: {
    back: "#111113",
    grid: "#2e2f3055"
  },
  scripts: [VolumeSummary, Imbalance],
  config: {
    ZOOM_MODE: 'tl'
  }
});


let dl = new DataLoader();

dl.load((data) => {
  chart.data = data;
  chart.update();
});

window.chart = chart;
