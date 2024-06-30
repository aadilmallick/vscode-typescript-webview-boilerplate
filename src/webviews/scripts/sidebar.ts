import html from "./templates/sidebar.html";
import { selectWithThrow, $, $$ } from "./utils/base";

const root = selectWithThrow("#root");
root.innerHTML = html;
