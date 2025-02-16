const express = require('express');
const app = express();
const orderRouter = require('./orderController'); // Путь к контроллеру

app.use(express.json()); // Поддержка JSON-запросов
app.use('/orders', orderRouter); // Маршрутизация API

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});