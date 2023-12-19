import NewTask from "./NewTask.jsx";
import { Context, useContext } from "react";
import { ProjectsContext } from "../store/projects-context.jsx";

export default function Tasks({}) {
  const { selectedProjectId, projects, tasks, addTask, taskDone } =
    useContext(ProjectsContext);

  const onAdd = addTask;
  const onDelete = taskDone;

  const project = selectedProjectId;

  return (
    <section>
      <h2 className="text-xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />

      {projects[project].tasks.length === 0 && (
        <p className="text-stone-800 mb-4">
          No task created yet! Please do so...
        </p>
      )}

      {projects[project].tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {projects[project].tasks.map((task) => {
            return (
              <li
                key={task.id}
                className="flex items-center justify-between my-4"
              >
                <p className="text-stone-800">
                  {task.done ? (
                    <span className="text-stone-800 line-through">
                      {task.text}
                    </span>
                  ) : (
                    <span className="text-stone-800 font-bold ">
                      {task.text}
                    </span>
                  )}
                </p>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-stone-600 bg-slate-200 py-2 px-4 rounded-md text-sm font-bold hover:text-stone-950"
                >
                  {!task.done ? "Done" : "Undone"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
