import express from 'express';
import taskRoute from "./task.route";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/api/tasks', taskRoute);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});