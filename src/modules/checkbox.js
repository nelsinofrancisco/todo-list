export default class HandleCheckBoxChanges {
  constructor(store) {
    this.store = store;
  }

  addChangeListener() {
    this.checkBoxes = document.querySelectorAll('input[type="checkbox"]');

    this.checkBoxes.forEach((element, index) => {
      element.addEventListener('change', () => {
        if (element.checked) {
          element.parentElement.nextElementSibling.classList.toggle('line-trought');
          this.store.updateCompleted(index, true);
        } else {
          element.parentElement.nextElementSibling.classList.toggle('line-trought');
          this.store.updateCompleted(index, false);
        }
        localStorage.setItem('tasks_data', JSON.stringify(this.store.getItems()));
      });
    });
  }
}