export default class HandleCheckBoxChanges {
  addChangeListener(list) {
    this.checkBoxes = document.querySelectorAll('input[type="checkbox"]');

    this.checkBoxes.forEach((element, index) => {
      element.addEventListener('change', () => {
        if (element.checked) {
          element.parentElement.nextElementSibling.classList.toggle('line-trought');
          element.checked = true;
          list[index].completed = true;
        } else {
          element.parentElement.nextElementSibling.classList.toggle('line-trought');
          element.checked = false;
          list[index].completed = false;
        }
        localStorage.setItem('tasks_data', JSON.stringify(list));
      });
    });
  }
}