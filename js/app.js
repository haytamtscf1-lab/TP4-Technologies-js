import { state, setData } from "./state.js";
import { loadAllData } from "./dataService.js";
import { getCustomerById, getEnrichedOrder, getStats } from "./selectors.js";

async function init() {
  try {
    const data = await loadAllData();
    setData(data);

   
    console.log("Client 1 :", getCustomerById(state, 1));
    console.log("Commande 101 :", getEnrichedOrder(state, state.orders[0]));
    console.log("Stats :", getStats(state));
  } catch (error) {
    console.error("Initialisation impossible :", error);
  }
}

init();