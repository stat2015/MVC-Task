// TaskModel.js
class TaskModel {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    addTask(title, description) {
        const task = {
            id: this.nextId++,
            title,
            description,
            completed: false,
            createdAt: new Date()
        };
        this.tasks.push(task);
        return task;
    }

    getTasks() {
        return [...this.tasks]; // Return a copy to prevent direct manipulation
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    toggleTaskCompletion(id) {
        const task = this.getTaskById(id);
        if (task) {
            task.completed = !task.completed;
        }
        return task;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}