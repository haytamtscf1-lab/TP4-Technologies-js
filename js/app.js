import { state, setData } from "./state.js";
import { loadAllData } from "./dataService.js";

async function init() {
  try {
    const data = await loadAllData();
    setData(data);
    console.log("State chargé :", state);
  } catch (error) {
    console.error("Initialisation impossible :", error);
  }
}

init();