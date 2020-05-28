import requests from './base-service';

const Pizza = {
    pizzaLIst: (page) => requests.get(`/pizzas?page=${page}`,),
    buy: (pizzas, address) => requests.post(`/orders`, {address, pizzas} ),
    history: () => requests.get(`/orders`),
    historyById: (id) => requests.get(`/orders/${id}`),
};

export default Pizza;
