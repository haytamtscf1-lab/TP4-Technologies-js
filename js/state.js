
export const state = {
  customers: [],
  products: [],
  orders: [],
  search: "",
  selectedStatus: "",
  selectedCategory: ""
};

export function setData({ customers, products, orders }) {
  state.customers = customers;
  state.products = products;
  state.orders = orders;
}

export function setFilter(key, value) {
  state[key] = value;
}