const content = document.querySelector("main");

const renderLists = () => {
  content.innerHTML = "";

  lists.map((list, index) => {
    content.innerHTML += `
      <div class="list">
        <div class="d-flex justify-content-between align-items-center">
          <p class="fw-bold">${list.title}</p>
          <div class="dropdown">
            <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <ul class="dropdown-menu p-3">
              <li onclick="deleteList(${index})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-trash"></i> Delete List</a></li>
              <li onclick="EditListName(${index})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-pen"></i> Rename List</a></li>
              <li onclick="duplicate(${index})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-copy"></i> Duplicate List</a></li>
            </ul>
            
          </div>
        </div>
        <form class="d-flex gap-2">
          <input type="text" class="form-control" placeholder="Add New Task" />
          <button class="btn btn-outline-primary border-2"  onclick="addNewTask(${index})">Add</button>
        </form>
          
        <ul class="list-group mt-2">
          ${list.tasks
            .map((task, indexTask) => {
              return `<li class="list-group-item d-flex justify-content-between align-items-center">
                <p class="w-50">${indexTask + 1}. ${task.title}</p>
                <div>
                <div class="dropdown">
            <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <ul class="dropdown-menu p-3">
              <li onclick="editTask(${index}, ${indexTask})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-pen"></i> Edit</a></li>
              <li onclick="deleteTask(${index}, ${indexTask})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-trash"></i> Delete Task</a></li>
              <li onclick="completeTask(${index}, ${indexTask})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-check"></i> Success</a></li>
            </ul>
          </div>
                  
                </div>

              </li>`;
            })

            .join("")}
            
            <div class="completed"></div>
            </ul>
        <div class="accordion mt-2" id="accordionExample-${index}" >
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne-${index}"
                aria-expanded="true"
                aria-controls="collapseOne-${index}"
              >
                Completed
              </button>
            </h2>
            <div
              id="collapseOne-${index}"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample-${index}"
            >
              <div class="accordion-body" >
              
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });
  const accordionBody = document.querySelector("accordionBody");
  content.innerHTML += `<div class="list">
    <form class="d-flex gap-2">
      <input type="text" class="form-control" placeholder="Add New List" id="list-name" />
      <button class="btn btn-outline-primary border-2" onclick="addNewList()">+</button>
    </form>
  </div>`;
};

const completeTask = (listIndex, taskIndex) => {
  lists[listIndex].tasks[taskIndex].completed = true;
  renderLists();
  saveToLacalStorage();
};

content.innerHTML += `<div class="list">
  <div class="d-flex gap-2">
    <input type="text" class="form-control" placeholder="Add New List" id="list-name" />
    <button class="btn btn-primary" onclick="addNewList()">+</button>
  </div>
</div>`;

const validation = (title) => title.trim().length > 0;

const saveToLacalStorage = () => {
  localStorage.setItem("lists", JSON.stringify(lists));
};

const addNewList = () => {
  const listNameInput = document.querySelector("#list-name");

  if (!validation(listNameInput.value)) return;

  lists.push({ title: listNameInput.value, tasks: [] });

  renderLists();
  saveToLacalStorage();
};

const searchTasks = () => {
  content.innerHTML = "";
  const searchQuery = document
    .querySelector("#search-query")
    .value.trim()
    .toLowerCase();

  // Filter lists based on the search query
  const filteredLists = lists.map((list) => {
    const filteredTasks = list.tasks.filter((task) => {
      return task.title.toLowerCase().includes(searchQuery);
    });

    return {
      ...list,
      tasks: filteredTasks,
    };
  });

  // Render the filtered lists
  content.innerHTML = "";
  filteredLists.forEach((list, index) => {
    content.innerHTML += `
      <div class="list">
        <div class="d-flex justify-content-between align-items-center">
          <p class="fw-bold">${list.title}</p>
          <div class="dropdown">
            <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <ul class="dropdown-menu p-3">
              <li onclick="deleteList(${index})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-trash"></i> Delete List</a></li>
              <li onclick="EditListName(${index})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-pen"></i> Rename List</a></li>
              <li onclick="duplicate(${index})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-copy"></i> Duplicate List</a></li>
            </ul>
            
          </div>
        </div>
        <form class="d-flex gap-2">
          <input type="text" class="form-control" placeholder="Add New Task" />
          <button class="btn btn-outline-primary border-2"  onclick="addNewTask(${index})">Add</button>
        </form>
          
        <ul class="list-group mt-2">
          ${list.tasks
            .map((task, indexTask) => {
              return `<li class="list-group-item d-flex justify-content-between align-items-center">
                <p class="w-50">${indexTask + 1}. ${task.title}</p>
                <div>
                <div class="dropdown">
            <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <ul class="dropdown-menu p-3">
              <li onclick="editTask(${index}, ${indexTask})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-pen"></i> Edit</a></li>
              <li onclick="deleteTask(${index}, ${indexTask})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-trash"></i> Delete Task</a></li>
              <li onclick="completeTask(${index}, ${indexTask})"><a class="dropdown-item bg-transparent" href="#"><i class="fa-solid fa-check"></i> Success</a></li>
            </ul>
          </div>
                  
                </div>

              </li>`;
            })

            .join("")}
            
            <div class="completed"></div>
            </ul>
        <div class="accordion mt-2" >
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Completed
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body" >
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });

  // Render the add new list section
  content.innerHTML += `<div class="list">
  <div class="d-flex gap-2">
    <input type="text" class="form-control" placeholder="Add New List" id="list-name" />
    <button class="btn btn-primary" onclick="addNewList()">+</button>
  </div>
</div>`;
};

const addNewTask = (listIndex) => {
  const title = document.querySelector(
    `.list:nth-child(${listIndex + 1}) input`
  ).value;
  console.log(title);

  if (!validation(title)) return;

  lists[listIndex].tasks.push({ title });

  renderLists();
  saveToLacalStorage();
};
const deleteTask = (listIndex, TaskIndex) => {
  console.log(listIndex, TaskIndex);
  const tasks = lists[listIndex].tasks;
  lists[listIndex].tasks = [
    ...tasks.slice(0, TaskIndex),
    ...tasks.slice(TaskIndex + 1),
  ];
  renderLists();
  saveToLacalStorage();
};

const dropdown = () => {};

const editTask = (listIndex, TaskIndex) => {
  const saveEdit = prompt("Enter New Task Name:");
  lists[listIndex].tasks[TaskIndex].title = saveEdit;
  renderLists();
  saveToLacalStorage();
  console.log(taskElement);
};

const EditListName = (listIndex) => {
  const saveEditTitle = prompt("Enter New List Name:");
  lists[listIndex].title = saveEditTitle;
  renderLists();
  saveToLacalStorage();
};
const duplicate = (indexItem) => {
  const newList = JSON.parse(JSON.stringify(lists[indexItem]));
  lists.push(newList);
  renderLists();
  saveToLacalStorage();
};

const deleteList = (listIndex) => {
  lists.splice(listIndex, 1);
  renderLists();
  saveToLacalStorage();
};
const completedBtn = (listIndex, TaskIndex) => {
  const completedBOx = document.querySelector("#completedBOx");
  if (completedBOx.value === true) {
    const tasks = lists[listIndex];
    tasks[TaskIndex].classlist = "text-decoration-line-through";
  } else {
    console.log(Error);
  }

  renderLists();
  saveToLacalStorage();
};
const inTheme = () => {};

const init = () => {
  renderLists();
};
