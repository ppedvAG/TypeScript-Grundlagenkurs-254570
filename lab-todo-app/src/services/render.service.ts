import { type InputType, type Task, inputTypes } from '../types/task.types';
import { addTaskItem, isDued, fullTitle, priorityFromNumber } from './task.service';

export function createElement(parent: HTMLElement, type: InputType, placeholder?: string): HTMLInputElement;
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

        const priority = priorityFromNumber(prioNumber.valueAsNumber);
        const task = addTaskItem(taskInput.value, dueInput.valueAsDate ?? undefined, labelInput.value, priority);
        drawTaskItem(task, priority);

        form.reset();
        submitButton.disabled = true;
    });

    taskInput.addEventListener('input', function (e) {
        submitButton.disabled = !taskInput.value;
    });

    function drawTaskItem(task: Task, priority: string) {
        const listItem = createElement(list, 'li');
        const checkbox = createElement(listItem, 'checkbox');
        const div = createElement(listItem, 'div');
        const title = createElement(div, 'span', fullTitle(task));
        title.classList.add(priority);

        const labels = createElement(div, 'div');
        labels.classList.add('label-group');
        task.labels?.filter(Boolean).forEach((label) => {
            createElement(labels, 'span', label).classList.add('label');
        });

        if (isDued(task)) {
            title.classList.add('due');
        }

        checkbox.addEventListener('click', function () {
            task.completed = checkbox.checked;
            div.classList.toggle('completed');
        });
    }
}
