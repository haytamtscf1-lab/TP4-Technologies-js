
async function loadJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Impossible de charger ${url} (HTTP ${response.status})`);
  }
  return response.json();
}


export async function loadAllData() {
  try {
    const [customers, products, orders] = await Promise.all([
      loadJSON("data/customers.json"),
      loadJSON("data/products.json"),
      loadJSON("data/orders.json")
    ]);
    return { customers, products, orders };
  } catch (error) {
    console.error("[dataService] Erreur de chargement :", error);
    throw error;
  }
}