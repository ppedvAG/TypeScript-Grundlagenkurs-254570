import { type InputType, type Task, inputTypes } from '../types/task.types';
import TaskItem from './task.model';
import StorageService from './storage.service';
import RemoteService from './remote.service';

export function createElement<T>(parent: HTMLElement, type: InputType, placeholder?: string): HTMLInputElement;
export function createElement<K extends keyof HTMLElementTagNameMap>(
    parent: HTMLElement,
    tagName: K,
    text?: string
): HTMLElementTagNameMap[K];
export function createElement<K extends keyof HTMLElementTagNameMap>(
    parent: HTMLElement,
    typeOrTag: InputType | K,
    text?: string
): HTMLElementTagNameMap[K] | HTMLInputElement {
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

export function drawForm(form: HTMLFormElement, list: HTMLUListElement) {
    createElement(form, 'label', 'Aufgabe');
    const taskInput = createElement(form, 'text', 'Aufgabe eingeben');

    createElement(form, 'label', 'Fälligkeit');
    const dueInput = createElement(form, 'date', 'Fälligkeit eingeben');

    createElement(form, 'label', 'Keywords');
    const labelInput = createElement(form, 'text', 'Komma separierte Liste');

    createElement(form, 'label', 'Priorität');
    const prioNumber = createElement(form, 'number', 'Priorität eingeben');
    prioNumber.min = '0';
    prioNumber.max = '2';
    prioNumber.value = '1';

    createElement(form, 'br');
    const submitButton = createElement(form, 'button', 'Neue Aufgabe');
    submitButton.disabled = true;
    submitButton.addEventListener('click', function (e) {
        // Default submit action des Forms verhindern
        // was einen Server Request ausloest
        e.preventDefault();

        addTask(taskInput.value, dueInput.valueAsDate, prioNumber.valueAsNumber, labelInput.value);

        form.reset();
        submitButton.disabled = true;
    });

    const errorOutput = createElement(form.parentElement!, 'pre');
    errorOutput.classList.add('due');

    function setError<T>(message: T) {
        errorOutput.innerText = `Fehler aufgetreten: ${message}`;
        setTimeout(() => (errorOutput.innerText = ''), 9900);
    }

    taskInput.addEventListener('input', function (e) {
        submitButton.disabled = !taskInput.value;
    });

    // const storage = new StorageService<Task>();
    // storage.loadItems().map(TaskItem.fromTask).forEach(drawTaskItem);

    const storage = new RemoteService<Task>(setError);
    storage.loadItems().then((items) => items.map(TaskItem.fromTask).forEach(drawTaskItem));

    function addTask(taskInput: string, dueInput: Date | null, prioNumber: number, labelInput: string) {
        const task = new TaskItem(taskInput, dueInput ?? undefined, prioNumber, labelInput.split(','));
        storage.setItem(task);
        drawTaskItem(task);
    }

    function drawTaskItem(task: TaskItem) {
        const listItem = createElement(list, 'li');
        const checkbox = createElement(listItem, 'checkbox');
        const div = createElement(listItem, 'div');

        const title = createElement(div, 'div', task.fullTitle);
        title.classList.add(task.priority);

        const labels = createElement(div, 'div');
        labels.classList.add('label-group');
        task.labels.filter(Boolean).forEach((label) => {
            createElement(labels, 'span', label).classList.add('label');
        });

        const remove = createElement(listItem, 'button', '🗑');
        remove.addEventListener('click', function () {
            storage.deleteItem(task.id);
            list.removeChild(listItem);
        });

        if (task.isDued) {
            title.classList.add('due');
        }

        checkbox.addEventListener('click', function () {
            task.completed = checkbox.checked;
            div.classList.toggle('completed');
        });
    }
}
