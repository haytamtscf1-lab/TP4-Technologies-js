const formatMAD = n => `${n.toLocaleString("fr-FR")} MAD`;


function statusBadge(status) {
  const colors = { "Livree": "success", "En attente": "warning", "Annulee": "danger" };
  return `<span class="badge text-bg-${colors[status] || "secondary"}">${status}</span>`;
}


export function renderStats(stats) {
  const cards = [
    { label: "Clients", value: stats.customersCount },
    { label: "Produits", value: stats.productsCount },
    { label: "Commandes", value: stats.ordersCount },
    { label: "Montant cumulé", value: formatMAD(stats.totalAmount) }
  ];

  document.getElementById("stats").innerHTML = cards.map(c => `
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <div class="text-muted small">${c.label}</div>
          <div class="fs-4 fw-semibold">${c.value}</div>
        </div>
      </div>
    </div>`).join("");
}


export function renderOrders(orders) {
  const tbody = document.getElementById("orders-body");

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">Aucune commande trouvée.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td>#${o.id}</td>
      <td>${o.customerName}<div class="small text-muted">${o.customerCity}</div></td>
      <td>${o.date}</td>
      <td>${statusBadge(o.status)}</td>
      <td class="text-end fw-semibold">${formatMAD(o.total)}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary btn-detail" data-id="${o.id}">Détail</button>
      </td>
    </tr>`).join("");
}


export function renderError(message) {
  const box = document.getElementById("error");
  box.textContent = message;
  box.classList.remove("d-none");
  document.getElementById("main-content").classList.add("d-none");
}
export function renderSelectOptions(selectId, values, allLabel) {
  document.getElementById(selectId).innerHTML =
    `<option value="">${allLabel}</option>` +
    values.map(v => `<option value="${v}">${v}</option>`).join("");
}

export function renderOrderDetail(order) {
  document.getElementById("detail-title").textContent = `Commande #${order.id}`;
  document.getElementById("detail-body").innerHTML = `
    <p class="mb-1"><strong>Client :</strong> ${order.customerName}</p>
    <p class="mb-1"><strong>Ville :</strong> ${order.customerCity}</p>
    <p class="mb-1"><strong>Date :</strong> ${order.date}</p>
    <p class="mb-3"><strong>Statut :</strong> ${statusBadge(order.status)}</p>
    <table class="table table-sm">
      <thead>
        <tr><th>Produit</th><th class="text-end">Prix</th><th class="text-end">Qté</th><th class="text-end">Montant</th></tr>
      </thead>
      <tbody>
        ${order.lines.map(l => `
          <tr>
            <td>${l.name}</td>
            <td class="text-end">${formatMAD(l.price)}</td>
            <td class="text-end">${l.quantity}</td>
            <td class="text-end">${formatMAD(l.amount)}</td>
          </tr>`).join("")}
      </tbody>
      <tfoot>
        <tr><th colspan="3">Total</th><th class="text-end">${formatMAD(order.total)}</th></tr>
      </tfoot>
    </table>`;
}