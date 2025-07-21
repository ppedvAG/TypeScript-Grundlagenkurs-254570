import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hello Todo-List!</h1>
  <ul id="list"></ul>
  <form action="">
    <label>Aufgabe</label>
    <input type="text" id="task"><br/>
    <button id="submit">Neue Aufgabe</button>
  </form>
`;

const todoList = document.getElementById('list') as HTMLUListElement;
const taskInput = document.getElementById('task') as HTMLInputElement;
const submitButton = document.getElementById('submit') as HTMLButtonElement;

submitButton!.addEventListener('click', function (e) {
    // Default submit action des Forms verhindern
    // was einen Server Request ausloest
    e.preventDefault();

    const listItem = document.createElement('li');
    listItem.innerText = taskInput.value;
    todoList.appendChild(listItem);
});
