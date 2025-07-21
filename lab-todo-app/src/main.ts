import './style.css';

// Wir definieren die Typinformationen in einem Array für die Prüfung
// der Überladung, da diese Informationen zur Laufzeit entfernt werden würden.
// verschwinden und wir somit keine Prüfung in der Überladung vornehmen können.
const inputTypes = ['checkbox', 'submit', 'color', 'date', 'number', 'search', 'text'] as const;
type InputType = (typeof inputTypes)[number];

type Priority = 'important' | 'default' | 'low';
type Task = {
    id: number;
    title: string;
    completed: boolean;
    priority: Priority;
    userId: number;
    dueDate: Date | null;
    labels?: string[];
};

const appRoot = document.querySelector<HTMLDivElement>('#app');
if (!appRoot) {
    throw new Error('Root element not found');
}

createElement(appRoot, 'h1', 'Hello Todo-List!');
const todoList = createElement(appRoot, 'ul');
const form = <HTMLFormElement>createElement(appRoot, 'form');

createElement(form, 'label', 'Aufgabe');
const taskInput = createElement(form, 'text', 'Aufgabe eingeben');

createElement(form, 'label', 'Fälligkeit');
const dueInput = createElement(form, 'date', 'Fälligkeit eingeben');

createElement(form, 'label', 'Keywords');
const labelInput = createElement(form, 'text', 'Komma separierte Liste');

createElement(form, 'label', 'Priorität');
const prioNumber = createElement(form, 'number', 'Priorität eingeben');

createElement(form, 'br');
const submitButton = <HTMLButtonElement>createElement(form, 'button', 'Neue Aufgabe');
submitButton.disabled = true;

const taskList: Task[] = [];
const prioMapper: { [key: number]: Priority } = ['low', 'default', 'important'];

submitButton.addEventListener('click', function (e) {
    // Default submit action des Forms verhindern
    // was einen Server Request ausloest
    e.preventDefault();

    const priority = prioMapper[prioNumber.valueAsNumber];
    const task = addTaskItem(taskInput.value, dueInput.valueAsDate, labelInput.value, priority);
    drawTaskItem(task, priority);

    form.reset();
    submitButton.disabled = true;
});

taskInput.addEventListener('input', function (e) {
    submitButton.disabled = !taskInput.value;
});

function drawTaskItem(task: Task, priority: string) {
    const listItem = createElement(todoList, 'li');
    const checkbox = createElement(listItem, 'checkbox');
    const span = createElement(listItem, 'span', task.title);
    span.classList.add(priority);

    checkbox.addEventListener('click', function () {
        task.completed = checkbox.checked;
        span.classList.toggle('completed');
    });
}

function addTaskItem(text: string, dueDate: Date | null, labels: string, priority: Priority): Task {
    const task: Task = {
        id: taskList.length + 1,
        userId: 0,
        title: text,
        labels: labels.split(','),
        completed: false,
        priority,
        dueDate,
    };
    taskList.push(task);
    return task;
}

function createElement(parent: HTMLElement, type: InputType, placeholder?: string): HTMLInputElement;
function createElement(parent: HTMLElement, tagName: keyof HTMLElementTagNameMap, text?: string): HTMLElement;
function createElement(
    parent: HTMLElement,
    typeOrTag: InputType | keyof HTMLElementTagNameMap,
    text?: string
): HTMLElement | HTMLInputElement {
    function isInputType(typeOrTag: string): typeOrTag is InputType {
        return inputTypes.includes(typeOrTag as InputType);
    }

    if (isInputType(typeOrTag)) {
        const element = document.createElement('input');
        element.type = typeOrTag;
        if (text) {
            element.placeholder = text;
        }
        parent.appendChild(element);
        return element;
    } else {
        const element = document.createElement(typeOrTag);
        if (text) {
            element.innerText = text;
        }
        parent.appendChild(element);
        return element;
    }
}
