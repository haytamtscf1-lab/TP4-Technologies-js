import { state, setData } from "./state.js";
import { loadAllData } from "./dataService.js";
import { getEnrichedOrder, getStats } from "./selectors.js";
import { renderStats, renderOrders, renderError } from "./view.js";


function render() {
  renderStats(getStats(state));
  const orders = state.orders.map(order => getEnrichedOrder(state, order));
  renderOrders(orders);
}


async function init() {
  try {
    const data = await loadAllData();
    setData(data);
    render();
  } catch (error) {
    console.error("Initialisation impossible :", error);
    renderError(`Erreur de chargement des données : ${error.message}`);
  }
}

init();