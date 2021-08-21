import './styles.css';
import Store from './modules/store.js';
import HandleTasks from './modules/handle_tasks.js';
import UI from './modules/user_interface.js';

const STORE = new Store();
const UI_INTERFACE = new UI(STORE);
const LIST = new HandleTasks(STORE, UI_INTERFACE);

UI_INTERFACE.generateHtmlTasks();
LIST.addItem();
LIST.clearAll();
LIST.updateValue();