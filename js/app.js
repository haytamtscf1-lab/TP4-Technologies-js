import { state, setData, setFilter } from "./state.js";
import { loadAllData } from "./dataService.js";
import {
  getEnrichedOrder, getStats, getFilteredOrders,
  getCategories, getStatuses
} from "./selectors.js";
import {
  renderStats, renderOrders, renderError,
  renderSelectOptions, renderOrderDetail
} from "./view.js";


function render() {
  renderStats(getStats(state));
  renderOrders(getFilteredOrders(state));
}


function bindEvents() {
  document.getElementById("search").addEventListener("input", e => {
    setFilter("search", e.target.value);
    render();
  });

  document.getElementById("status-filter").addEventListener("change", e => {
    setFilter("selectedStatus", e.target.value);
    render();
  });

  document.getElementById("category-filter").addEventListener("change", e => {
    setFilter("selectedCategory", e.target.value);
    render();
  });

  document.getElementById("reset").addEventListener("click", () => {
    setFilter("search", "");
    setFilter("selectedStatus", "");
    setFilter("selectedCategory", "");
    document.getElementById("search").value = "";
    document.getElementById("status-filter").value = "";
    document.getElementById("category-filter").value = "";
    render();
  });

  document.getElementById("orders-body").addEventListener("click", e => {
    const btn = e.target.closest(".btn-detail");
    if (!btn) return;
    const order = state.orders.find(o => o.id === Number(btn.dataset.id));
    if (!order) return;
    renderOrderDetail(getEnrichedOrder(state, order));
    bootstrap.Modal.getOrCreateInstance(document.getElementById("detail-modal")).show();
  });
}


async function init() {
  try {
    const data = await loadAllData();
    setData(data);
    renderSelectOptions("status-filter", getStatuses(state), "Tous les statuts");
    renderSelectOptions("category-filter", getCategories(state), "Toutes les catégories");
    bindEvents();
    render();
  } catch (error) {
    console.error("Initialisation impossible :", error);
    renderError(`Erreur de chargement des données : ${error.message}`);
  }
}

init();