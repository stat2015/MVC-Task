// TaskController.js
class TaskController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Display initial tasks
        this.onTaskListChanged(this.model.getTasks());

        // Bind view events
        this.view.bindAddTask(this.handleAddTask);
        this.view.bindToggleTask(this.handleToggleTask);
        this.view.bindDeleteTask(this.handleDeleteTask);

        // Subscribe to model changes
        this.model.tasksChanged = this.onTaskListChanged;
    }

    onTaskListChanged = (tasks) => {
        this.view.displayTasks(tasks);
    };

    handleAddTask = (title, description) => {
        this.model.addTask(title, description);
        this.onTaskListChanged(this.model.getTasks());
    };

    handleToggleTask = (id) => {
        this.model.toggleTaskCompletion(id);
        this.onTaskListChanged(this.model.getTasks());
    };

    handleDeleteTask = (id) => {
        this.model.deleteTask(id);
        this.onTaskListChanged(this.model.getTasks());
    };
}