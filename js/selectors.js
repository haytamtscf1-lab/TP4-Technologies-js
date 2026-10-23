
export function getCustomerById(state, id) {
  return state.customers.find(c => c.id === id);
}

export function getProductById(state, id) {
  return state.products.find(p => p.id === id);
}


export function getLineAmount(product, quantity) {
  return product ? product.price * quantity : 0;
}


export function getOrderLines(state, order) {
  return order.items.map(item => {
    const product = getProductById(state, item.productId);
    return {
      name: product ? product.name : "Produit inconnu",
      category: product ? product.category : "",
      price: product ? product.price : 0,
      quantity: item.quantity,
      amount: getLineAmount(product, item.quantity)
    };
  });
}


export function getOrderTotal(state, order) {
  let total = 0;
  getOrderLines(state, order).forEach(line => {
    total += line.amount;
  });
  return total;
}


export function getEnrichedOrder(state, order) {
  const customer = getCustomerById(state, order.customerId);
  const lines = getOrderLines(state, order);
  return {
    ...order,
    customerName: customer ? customer.name : "Client inconnu",
    customerCity: customer ? customer.city : "",
    lines,
    categories: lines.map(l => l.category),
    total: getOrderTotal(state, order)
  };
}



export function getStats(state) {
  let totalAmount = 0;
  state.orders.forEach(order => {
    totalAmount += getOrderTotal(state, order);
  });
  return {
    customersCount: state.customers.length,
    productsCount: state.products.length,
    ordersCount: state.orders.length,
    totalAmount
  };
}