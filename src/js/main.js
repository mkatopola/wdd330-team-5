import { loadHeaderFooter } from "./utils.mjs";
// here i come
import Alert from "./alert.mjs";

const alertInstance = new Alert("/json/alerts.json");
alertInstance.render();
//

loadHeaderFooter();
