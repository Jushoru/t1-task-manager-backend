import express, { Request, Response } from 'express';
import { TaskUi} from "./task.types";

const router = express.Router();

let tasks: TaskUi[] = [
    {
        id: '0',
        date: '2025-05-16T14:52:18.412Z',
        title: 'Fix login bug',
        description: 'User cannot logout after session expires',
        category: 'Bug',
        status: 'InProgress',
        priority: 'High',
    },
    {
        id: '1',
        date: '2025-07-16T14:52:18.412Z',
        title: 'Add dark mode',
        description: 'Implement dark theme toggle. For all devices in this World. World Wide theme for ALL DEVICES. Implement dark theme toggle. For all devices in this World. World Wide theme for ALL DEVICES.Implement dark theme toggle. For all devices in this World. World Wide theme for ALL DEVICES',
        category: 'Feature',
        status: 'ToDo',
        priority: 'Medium',
    },
    {
        id: '2',
        date: '2025-06-16T14:52:18.412Z',
        title: 'Write documentation',
        category: 'Documentation',
        status: 'Done',
        priority: 'Low',
    },
];

// GET /tasks — получить все задачи
router.get('/', (req: Request, res: Response) => {
    const { title, date } = req.query;

    let result = [...tasks];

    if (title) {
        result = result.filter(task =>
            task.title.toLowerCase().includes((title as string).toLowerCase())
        );
    }

    if (date) {
        result = result.filter(task => task.date === date);
    }

    res.json(result);
});

// GET /tasks/:id — получить задачу по ID
router.get('/:id', (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

// POST /tasks — создать новую задачу
router.post('/', (req: Request, res: Response) => {
    const task: TaskUi = req.body;
    tasks.push(task);
    res.status(201).json(task);
});

// PUT /tasks/:id — обновить задачу
router.put('/:id', (req: Request, res: Response) => {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).send('Task not found');

    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
});

// DELETE /tasks/:id — удалить задачу
router.delete('/:id', (req: Request, res: Response) => {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).send('Task not found');

    tasks.splice(index, 1);
    res.status(204).send();
});

export default router;