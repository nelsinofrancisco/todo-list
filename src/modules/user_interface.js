import HandleCheckBoxChanges from './checkbox.js';
import TrashIcon from '../assets/icons/trash-alt-regular.svg';
import SyncIcon from '../assets/icons/sync-alt-solid.svg';
import ArrowIcon from '../assets/icons/arrow-right-solid.svg';
import EllipsisIcon from '../assets/icons/ellipsis-v-solid.svg';

export default class UI {
  constructor(store) {
    this.HandleCheckBoxChanges = new HandleCheckBoxChanges(store);
    this.store = store;
  }

  updateIcons() {
    this.syncIcon = document.querySelector('.sync-icon');
    this.syncIcon.src = SyncIcon;

    this.arrowIcon = document.querySelector('.arrow-icon');
    this.arrowIcon = ArrowIcon;
  }

  generateHtmlTasks() {
    this.todoListContainer = document.getElementById('todo-list-container');
    this.todoListContainer.innerHTML = '';

    this.updateIcons();

    this.store.getItems().forEach((obj, index) => {
      const checked = (obj.completed) ? 'checked' : '';
      const lineTrought = (obj.completed) ? 'line-trought' : '';
      obj.index = index;

      this.todoListContainer.innerHTML += `<div id="${obj.index}"class="d-flex justify-content-start align-items-center mt-1">
      <div class="form-check me-1">
        <input class="checkbox form-check-input" type="checkbox" id="blankCheckbox" value="true" aria-label="..." ${checked}>
      </div>
      <input id="text-input-${obj.index}" class="text-description ${lineTrought}" type="text" placeholder="${obj.description}" value="${obj.description}"></input>
      <img src="${EllipsisIcon}" class="icon ellipsis-icon fas fa-ellipsis-v ms-auto text-secondary"/>
      <img src="${TrashIcon}" class="icon trash-icon ms-auto text-secundary d-none"/>
    </div>`;
    });

    this.HandleCheckBoxChanges.addChangeListener();
    // this.HandleTasks.addListeners();
  }
}