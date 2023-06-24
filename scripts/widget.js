import { cityServiseSearch } from "./modules/cityServiseSearch.js";
import { startWidget } from "./modules/widgetService.js"

const initWidget = async (app) => {

  const widget = await startWidget()
  app.append(widget)

  cityServiseSearch(widget);
}

initWidget(document.querySelector('#app'));