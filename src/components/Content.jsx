import { useContext } from "react";

import SelectedProject from "./SelectedProject";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";

import { ProjectsContext } from "../store/projects-context.jsx";

export default function Content() {
  const { selectedProjectId } = useContext(ProjectsContext);

  let content = (
    <SelectedProject
    /* project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleTaskDone}
        tasks={tasks} */
    />
  );

  if (selectedProjectId === null) {
    content = <NewProject ˇ />;
  } else if (selectedProjectId === undefined) {
    content = (
      <NoProjectSelected
      /* onStartAddProject={handleStartAddProject}  */
      />
    );
  }
  return content;
}
