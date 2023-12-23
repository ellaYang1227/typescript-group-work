import { Field, Form, ErrorMessage } from "vee-validate";
import type { App } from "vue";
export const veeComponentPlugin = {
  install: (app: App) => {
    app.component("VField", Field);
    app.component("VForm", Form);
    app.component("ErrorMessage", ErrorMessage);
  },
};
