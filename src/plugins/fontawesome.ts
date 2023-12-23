import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { App } from "vue";
library.add(fas, fab, far);

export const fontComponentPlugin = {
  install: (app: App) => {
    app.component("font-awesome-icon", FontAwesomeIcon);
  },
};
