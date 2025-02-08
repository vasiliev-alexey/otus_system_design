const express = require('express');
const router = express.Router();

// Пример базы данных (имитация)
let orders = [
    {
        id: "1",
        userId: "user123",
        status: "в ожидании",
        items: [
            { productId: "product1", quantity: 2 },
            { productId: "product2", quantity: 1 }
        ],
        totalPrice: 1500
    },
    {
        id: "2",
        userId: "user456",
        status: "обрабатывается",
        items: [
            { productId: "product3", quantity: 3 }
        ],
        totalPrice: 3000
    }
];

// Middleware для проверки существования заказа
function getOrderById(req, res, next) {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ error: "Заказ не найден" });
    }
    req.order = order;
    next();
}

// GET /orders - Получить список всех заказов пользователя
router.get('/orders', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: "Необходимо указать параметр userId" });
    }
    const userOrders = orders.filter(order => order.userId === userId);
    res.json(userOrders);
});

// POST /orders - Создать новый заказ
router.post('/orders', (req, res) => {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items)) {
        return res.status(400).json({ error: "Некорректные данные запроса" });
    }

    const newOrder = {
        id: String(orders.length + 1), // Генерация уникального ID
        userId,
        status: "в ожидании",
        items,
        totalPrice: items.reduce((total, item) => total + item.quantity * 100, 0) // Простой расчет стоимости
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// GET /orders/:id - Получить информацию о заказе по ID
router.get('/orders/:id', getOrderById, (req, res) => {
    res.json(req.order);
});

module.exports = router;