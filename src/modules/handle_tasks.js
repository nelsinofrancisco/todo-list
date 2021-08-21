export default class HandleTasks {
  constructor(store, UI) {
    this.store = store;
    this.UI = UI;
  }

  addItem() {
    this.input = document.getElementById('add-task');
    this.arrowIcon = document.querySelector('.arrow-icon');

    this.input.addEventListener('keydown', (e) => {
      const i = this.store.getItems().length;

      if (e.key === 'Enter' && e.target.value) {
        const obj = {
          description: e.target.value,
          completed: false,
          index: i,
        };
        this.input.value = '';
        this.store.add(obj);
        this.UI.generateHtmlTasks();
        e.preventDefault();
      }
    });

    this.arrowIcon.addEventListener('click', () => {
      const i = this.store.getItems().lenght;
      if (this.input.value) {
        const obj = {
          description: this.input.value,
          completed: false,
          index: i,
        };
        this.input.value = '';
        this.store.add(obj);
        this.UI.generateHtmlTasks();
      }
    });
  }

  removeItem(index) {
    this.store.remove(index);
    this.UI.generateHtmlTasks();
  }

  clearAll() {
    this.clearBtn = document.getElementById('clear-tasks');
    this.clearBtn.addEventListener('click', () => {
      this.store.removeAllCompleted();
      this.UI.generateHtmlTasks();
    });
  }

  removeAllTrashIcons() {
    this.trash = document.querySelectorAll('.trash-icon');
    this.ellipsis = document.querySelectorAll('.fa-ellipsis-v');
    this.trash.forEach((trash, index) => {
      trash.setAttribute('class', 'trash-icon ms-auto text-secundary d-none');
      this.ellipsis[index].setAttribute('class', 'icon ellipsis-icon fas fa-ellipsis-v ms-auto text-secondary');
    });
  }

  toggleAllElementTrashIcon(element) {
    this.trash = element.parentElement.querySelector('.trash-icon');
    this.ellipsis = element.parentElement.querySelector('.fa-ellipsis-v');
    this.trash.setAttribute('class', 'trash-icon ms-auto text-secundary d-none');
    this.ellipsis.setAttribute('class', 'icon ellipsis-icon fas fa-ellipsis-v ms-auto text-secondary');
  }

  toggleElementTrashIcon(element) {
    this.trash = element.parentElement.querySelector('.trash-icon');
    this.ellipsis = element.parentElement.querySelector('.fa-ellipsis-v');
    this.trash.classList.remove('d-none');
    this.ellipsis.setAttribute('class', 'icon ellipsis-icon fas fa-ellipsis-v ms-auto text-secondary d-none');
  }

  updateValue() {
    window.addEventListener('click', (e) => {
      if (e.target.className.includes('text-description')) {
        const nodeListInputs = document.querySelectorAll('.text-description');
        const index = parseInt(e.target.id.slice(11), 10);
        const trash = e.target.parentElement.querySelector('.trash-icon');

        nodeListInputs.forEach((input) => {
          if (input !== e.target) {
            this.toggleAllElementTrashIcon(input);
          }
        });

        this.toggleElementTrashIcon(e.target);

        trash.addEventListener('click', () => {
          this.removeItem(index);
        });

        e.target.addEventListener('blur', () => {
          this.store.updateDescription(index, e.target.value);
        });
      } else {
        this.removeAllTrashIcons();
      }
    });
  }
}