import './style.css';

type Task = {
    id: number;
    title: string;
    completed: boolean;
    priority: Priority;
    userId: number;
    dueDate: Date | null;
    labels?: string[];
};

type Priority = 'important' | 'default' | 'low';
type PriorityMapper = { [key: number]: Priority };

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hello Todo-List!</h1>
  <ul id="list"></ul>
  <form action="">
    <label>Aufgabe</label>
    <input type="text" id="task" placeholder="Aufgabe eingeben">
    <label>Fälligkeit</label>
    <input type="date" id="due">
    <label>Keywords</label>
    <input type="text" id="labels" placeholder="Komma separierte Liste">
    <label>Priorität</label>
    <input type="number" min="0" max="2" value="1" id="prio">
    <br/>
    <button id="submit">Neue Aufgabe</button>
  </form>
`;

const taskList: Task[] = [];
const prioMapper: PriorityMapper = ['low', 'default', 'important'];
const todoList = <HTMLUListElement>document.getElementById('list');
const taskInput = <HTMLInputElement>document.getElementById('task');
const dueInput = <HTMLInputElement>document.getElementById('due');
const labelInput = <HTMLInputElement>document.getElementById('labels');
const prioNumber = <HTMLInputElement>document.getElementById('prio');
const submitButton = document.getElementById('submit');

submitButton!.addEventListener('click', function (e) {
    // Default submit action des Forms verhindern
    // was einen Server Request ausloest
    e.preventDefault();

    const task: Task = {
        id: taskList.length + 1,
        userId: 0,
        title: taskInput.value,
        dueDate: dueInput.valueAsDate,
        labels: labelInput.value.split(','),
        completed: false,
        priority: prioMapper[prioNumber.valueAsNumber],
    };
    taskList.push(task);

    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    listItem.appendChild(checkbox);

    const text = document.createElement('span');
    text.innerText = task.title;
    listItem.appendChild(text);

    todoList.appendChild(listItem);
});
