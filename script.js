const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');

// Load tasks from localStorage
window.addEventListener('load', () => {
  const stored = JSON.parse(localStorage.getItem('tasks')) || [];
  stored.forEach(task => createTask(task.text, task.completed));
  updateCounter();
});

// Add task on button click
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.classList.add('error');
    taskInput.placeholder = 'Please enter a task';
    setTimeout(() => taskInput.classList.remove('error'), 1500);
    return;
  }
  createTask(text);
  taskInput.value = '';
  updateCounter();
});

// Add task on Enter key
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTaskBtn.click();
});

// Create task element
function createTask(text, completed = false) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'task-buttons';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔️';
  completeBtn.title = 'Mark as done';
  completeBtn.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
    updateCounter();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.title = 'Delete task';
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    saveTasks();
    updateCounter();
  };

  buttonsDiv.append(completeBtn, deleteBtn);
  li.append(span, buttonsDiv);
  taskList.appendChild(li);
  saveTasks();
  updateCounter();
}

// Save to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(item => {
    tasks.push({
      text: item.querySelector('span').textContent,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task counter
function updateCounter() {
  const count = document.querySelectorAll('.task-item:not(.completed)').length;
  taskCounter.textContent = `${count} task${count !== 1 ? 's' : ''} remaining`;
}

// Filter tasks
function filterTasks(type) {
  document.querySelectorAll('.task-item').forEach(task => {
    const isDone = task.classList.contains('completed');
    task.style.display =
      type === 'all' || (type === 'active' && !isDone) || (type === 'completed' && isDone)
        ? 'flex'
        : 'none';
  });
}
