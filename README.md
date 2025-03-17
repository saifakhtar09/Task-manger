# Task-managerTask Manager Web Application
This Task Manager is a dynamic web application built using HTML, CSS, JavaScript, and Bootstrap. It allows users to efficiently manage their tasks with an intuitive drag-and-drop interface.

🔹 Key Features:
✅ Add Tasks – Easily create new tasks with relevant details.
✅ Task Status Management – Organize tasks into To-Do, In Progress, and Done columns.
✅ Drag & Drop – Seamlessly move tasks between different status categories.
✅ Edit & Delete – Modify task details or remove tasks when completed.
✅ Task Details – Click on a task to view its full details.

With its clean design and interactive functionality, this Task Manager simplifies task tracking and enhances productivity! 🚀

git remote add origin https://github.com/your-username/your-repo.git
Incase of ovelaping Cloumn updadte the css :

.task-columns {
  display: flex;
  width: 100%;
  height: 500px; /* Set a fixed height */
  border: 2px solid #ccc;
  overflow: hidden; /* Prevents extra growth */
}

.column {
  width: 400px; /* Fixed width */
  max-width: 400px;
  flex-shrink: 0; /* Prevents shrinking */
  background: white;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: 0.3s;
  overflow-y: auto; /* Enables scrolling inside the column */
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  height: 100%; /* Fixed height */
}

