// app.js
document.addEventListener('DOMContentLoaded', () => {
    const model = new TaskModel();
    const view = new TaskView();
    const controller = new TaskController(model, view);
});