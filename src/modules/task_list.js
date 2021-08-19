import HandleCheckBoxChanges from './checkbox.js';

export default class TaskList {
  constructor() {
    this.task_data = JSON.parse(localStorage.getItem('tasks_data'))
    || [];
    this.HandleCheckBoxChanges = new HandleCheckBoxChanges();
  }

  clearList() {
    this.todoListContainer = document.getElementById('todo-list-container');
    this.todoListContainer.innerHTML = '';
  }

  addItem() {
    this.input = document.getElementById('add-task');
    this.arrowIcon = document.querySelector('.arrow-icon');

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const obj = {
          index: (this.task_data.lenght),
          description: this.input.value,
          completed: false,
        };

        this.input.value = '';
        this.task_data.push(obj);
        localStorage.setItem('tasks_data', JSON.stringify(this.task_data));
        this.clearList();
        this.generateHtmlTasks();
        e.preventDefault();
      }
    });

    this.arrowIcon.addEventListener('click', () => {
      const obj = {
        index: (this.task_data.lenght),
        description: this.input.value,
        completed: false,
      };
      this.input.value = '';
      this.task_data.push(obj);
      localStorage.setItem('tasks_data', JSON.stringify(this.task_data));
      this.clearList();
      this.generateHtmlTasks();
    });
  }

  generateHtmlTasks() {
    this.todoListContainer = document.getElementById('todo-list-container');

    this.task_data.forEach((obj) => {
      const checked = (obj.completed) ? 'checked' : '';
      const lineTrought = (obj.completed) ? 'line-trought' : '';
      this.todoListContainer.innerHTML += `<div id="${obj.index}"class="d-flex justify-content-start mt-1">
      <div class="form-check me-1">
        <input class="checkbox form-check-input position-static" type="checkbox" id="blankCheckbox" value="true" aria-label="..." ${checked}>
      </div>
      <h2 class="text-description fs-6 text-secondary ${lineTrought}">${obj.description}</h2>
      <i class="fas fa-ellipsis-v ms-auto text-secondary"></i>
    </div>`;
    });

    this.HandleCheckBoxChanges.addChangeListener(this.task_data);
  }
}