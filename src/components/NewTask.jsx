import { useState, useContext } from "react";
import { ProjectsContext } from "../store/projects-context.jsx";

import Button from "./Button.jsx";

export default function NewTask({ onAdd, onDelete }) {
  const { selectedProjectId } = useContext(ProjectsContext);
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        onChange={handleChange}
        value={enteredTask}
        type="text"
        placeholder="Task Name"
        className="w-64 py-2 px-2 rounded-sm bg-stone-200 text-stone-600 focus:outline-none focus:border-amber-600 border-b-2 border-stone-600"
      />
      <Button onClick={handleClick}>Add Task</Button>
    </div>
  );
}
