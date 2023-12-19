import Tasks from "./Tasks.jsx";
import { Context, useContext } from "react";

import { ProjectsContext } from "../store/projects-context.jsx";

export default function SelectedProject({}) {
  const { selectedProjectId, projects, deleteTask, deleteProject } =
    useContext(ProjectsContext);

  const onDelete = deleteProject;

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId,
  );

  const formattedDate = new Date(selectedProject.dueDate).toLocaleDateString(
    "da-DK",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <div className="w-[26rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-500">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-600 mb-2">
            {selectedProject.title}
            <span className="text-stone-400 font-normal text-sm">
              &nbsp;{selectedProjectId}
            </span>
          </h1>
          <button
            onClick={() => onDelete(selectedProjectId)}
            className="text-stone-600 bg-slate-200 py-2 px-4 rounded-md text-sm font-bold hover:text-stone-950"
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400"> {formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {selectedProject.description}
        </p>
      </header>
      <Tasks />
    </div>
  );
}
