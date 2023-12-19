import React, { useState, useContext } from "react";

import NewProject from "./components/NewProject.jsx";
import Content from "./components/Content.jsx"
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
import ProjectsContext from "./store/projects-context.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
   
  }); 
  
  

  return (
    <ProjectsContext>
    <main className='h-screen my-8 flex gap-8'>
      <h1 className='my-8 text-center text-5xl font-bold'></h1>
      <ProjectsSidebar />
     <Content />
    </main>
    </ProjectsContext>
  );
}

export default App;
