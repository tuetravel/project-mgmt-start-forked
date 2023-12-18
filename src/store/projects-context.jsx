import { createContext, useReducer } from "react";

export const ProjectsContext = createContext({
  selectedProjectId: undefined,
  tasks: [],
  projects: [],
  handleAddTask: () => {},
  handleDeleteTask: () => {},
  handleTaskDone: () => {},
  handleAddProject: () => {},
  handleCancelAddProject: () => {},
  handleStartAddProject: () => {},
  handleSelectProject: () => {},
});

function projectsReducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    case "SELECT_PROJECT":
      return {
        ...state,
        selectedProjectId: action.payload,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TASK_DONE":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, done: !task.done };
          }
          return task;
        }),
      };
    default:
      return state;
  }
}

export default function ProjectsContextProvider({ children }) {
  const [projectsContextState, projectContextDispatch] = useReducer(
    projectsReducer,
    initialProjectsState
  );

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId =
        projectsState.tasks.length > 0 ? projectsState.tasks.length : 0;

      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
        done: false,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleTaskDone(id) {
    setProjectsState((prevState) => {
      const taskIndex = prevState.tasks.findIndex((task) => task.id === id);
      const task = prevState.tasks[taskIndex];
      const updatedTask = { ...task, done: !task.done };
      const updatedTasks = [...prevState.tasks];
      updatedTasks[taskIndex] = updatedTask;

      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId =
        projectsState.projects.length > 0 ? projectsState.projects.length : 0;

      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleTaskDone}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <ProjectsContext.Provider
      value={{ projectsContextState, projectContextDispatch }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
