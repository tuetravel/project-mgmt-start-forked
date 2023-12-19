import { createContext, useState, useReducer } from "react";
import ProjectsSidebar from "../components/ProjectsSidebar.jsx";
import SelectedProject from "../components/SelectedProject.jsx";
import NoProjectSelected from "../components/NoProjectSelected.jsx";
import NewProject from "../components/NewProject.jsx";

export const ProjectsContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  addTask: () => {},
  deleteTask: () => {},
  taskDone: () => {},
  addProject: () => {},
  deleteProject: () => {},
  cancelAddProject: () => {},
  startAddProject: () => {},
  selectProject: () => {},
});

function projectsReducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECT":
      const projectId = state.projects.length > 0 ? state.projects.length : 0;

      const newProject = {
        ...action.payload,
        id: projectId,
        tasks: [],
      };

      return {
        ...state,
        projects: [...state.projects, newProject],
      };
    case "START_ADD_PROJECT":
      return {
        ...state,
        selectedProjectId: action.payload,
      };

    case "SELECT_PROJECT":
      return {
        ...state,
        selectedProjectId: action.payload,
      };
    case "ADD_TASK":
      const taskId =
        state.projects[state.selectedProjectId].tasks.length > 0
          ? state.projects[state.selectedProjectId].tasks.length
          : 0;

      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id !== state.selectedProjectId) {
            return project;
          }
          return {
            ...project,
            tasks: [
              ...project.tasks,
              {
                id: taskId,
                text: action.payload.text,
                done: false,
              },
            ],
          };
        }),
      };

    case "CANCEL_ADD_PROJECT":
      return {
        ...state,
        selectedProjectId: undefined,
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TASK_DONE":
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id !== state.selectedProjectId) {
            return project;
          }
          return {
            ...project,
            tasks: project.tasks.map((task) => {
              if (task.id !== action.payload) {
                return task;
              }
              return {
                ...task,
                done: !task.done,
              };
            }),
          };
        }),
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload,
        ),
      };
    default:
      return state;
  }
}

export default function ProjectsContextProvider({ children }) {
  const [projectsContextState, projectContextDispatch] = useReducer(
    projectsReducer,
    {
      selectedProjectId: undefined,
      projects: [],
    },
  );

  function handleAddTask(text) {
    projectContextDispatch({
      type: "ADD_TASK",
      payload: {
        text: text,
        done: false,
      },
    });
  }

  function handleDeleteTask(id) {
    projectContextDispatch((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleTaskDone(id) {
    projectContextDispatch({ type: "TASK_DONE", payload: id });
  }

  function handleStartAddProject() {
    projectContextDispatch({ type: "START_ADD_PROJECT", payload: null });
  }

  function handleAddProject(projectData) {
    projectContextDispatch({ type: "ADD_PROJECT", payload: projectData });
  }
  function handleCancelAddProject() {
    projectContextDispatch({ type: "CANCEL_ADD_PROJECT", payload: undefined });
  }

  function handleSelectProject(id) {
    projectContextDispatch({ type: "SELECT_PROJECT", payload: id });
  }

  function handleDeleteProject(selectedProjectId) {
    projectContextDispatch({
      type: "DELETE_PROJECT",
      payload: selectedProjectId,
    });

    projectContextDispatch({ type: "SELECT_PROJECT", payload: undefined });
  }
  function handleCancelAddProject() {
    projectContextDispatch({ type: "CANCEL_ADD_PROJECT", payload: undefined });
  }

  const ctxValue = {
    selectedProjectId: projectsContextState.selectedProjectId,
    projects: projectsContextState.projects,
    addProject: handleAddProject,
    addTask: handleAddTask,
    cancelAddProject: handleCancelAddProject,
    deleteProject: handleDeleteProject,
    deleteTask: handleDeleteTask,
    taskDone: handleTaskDone,
    cancelAddProject: handleCancelAddProject,
    startAddProject: handleStartAddProject,
    selectProject: handleSelectProject,
  };

  return (
    <ProjectsContext.Provider value={ctxValue}>
      {children}
    </ProjectsContext.Provider>
  );
}
