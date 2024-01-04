import type { App } from "vue";
import Comp from "./index.vue";
import config from "../settings/config.json";

Comp.install = (app: App) => {
  app.component(`${config.prefix}${config.namespace}${config.name}`, Comp);
};

export default Comp;
