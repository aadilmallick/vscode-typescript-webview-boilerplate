import { selectWithThrow, $, $$, debounce } from "./utils/base";
import html from "./templates/firstWebview.html";
import ReactiveState from "./utils/ReactiveState";

console.log("Hello from myscript.ts");

const root = selectWithThrow("#root");
root.innerHTML = html;
