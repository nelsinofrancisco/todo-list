import './styles.css';
import TaskList from './modules/task_list.js';

const list = new TaskList();

list.generateHtmlTasks();
list.addItem();