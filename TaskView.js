// TaskView.js
class TaskView {
    constructor() {
        this.app = this.getElement('#root');
        this.form = this.createElement('form');
        this.inputTitle = this.createElement('input');
        this.inputTitle.type = 'text';
        this.inputTitle.placeholder = 'Task title';
        this.inputDescription = this.createElement('input');
        this.inputDescription.type = 'text';
        this.inputDescription.placeholder = 'Task description';
        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Add Task';
        
        this.form.append(
            this.inputTitle, 
            this.inputDescription, 
            this.submitButton
        );
        
        this.taskList = this.createElement('ul', 'task-list');
        this.app.append(this.form, this.taskList);
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    bindAddTask(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const title = this.inputTitle.value.trim();
            const description = this.inputDescription.value.trim();
            if (title) {
                handler(title, description);
                this.inputTitle.value = '';
                this.inputDescription.value = '';
            }
        });
    }

    bindToggleTask(handler) {
        this.taskList.addEventListener('click', event => {
            if (event.target.tagName === 'LI') {
                const id = parseInt(event.target.dataset.id);
                handler(id);
            }
        });
    }

    bindDeleteTask(handler) {
        this.taskList.addEventListener('click', event => {
            if (event.target.className === 'delete-btn') {
                const id = parseInt(event.target.parentElement.dataset.id);
                handler(id);
            }
        });
    }

    displayTasks(tasks) {
        // Clear the task list
        while (this.taskList.firstChild) {
            this.taskList.removeChild(this.taskList.firstChild);
        }

        // Show default message if no tasks
        if (tasks.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'No tasks added yet!';
            this.taskList.append(p);
        } else {
            // Create task items
            tasks.forEach(task => {
                const li = this.createElement('li');
                li.dataset.id = task.id;

                const span = this.createElement('span');
                span.textContent = `${task.title}: ${task.description}`;
                
                const deleteButton = this.createElement('button', 'delete-btn');
                deleteButton.textContent = 'Delete';
                
                li.append(span, deleteButton);
                
                if (task.completed) {
                    li.classList.add('completed');
                }
                
                this.taskList.append(li);
            });
        }
    }
}