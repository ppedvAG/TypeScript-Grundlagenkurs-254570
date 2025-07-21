import { createElement, drawForm } from './services/render.service';
import './style.css';

const appRoot = document.querySelector<HTMLDivElement>('#app');
if (!appRoot) {
    throw new Error('Root element not found');
}

createElement(appRoot, 'h1', 'Hello Todo-List!');
const todoList = <HTMLUListElement>createElement(appRoot, 'ul');
const form = <HTMLFormElement>createElement(appRoot, 'form');
drawForm(form, todoList);
