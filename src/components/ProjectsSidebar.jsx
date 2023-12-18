import Button from "./Button.jsx";

export default function ProjectsSidebar({
  onStartAddProject,
  onSelectProject,
  selectedprojectId,
  projects,
}) {
  return (
    <aside className='w-1/3 px-8 py-16 bg-gradient-to-br from-zinc-100 to-slate-200 text-amber-800 md:w-64 rounded-r'>
      <div>
        <h2 className='mb-8 font-bold uppercase md:text-xl'>Projects</h2>
        <Button onClick={onStartAddProject}>+ Add project</Button>
      </div>
      <ul className='mt-8'>
        {projects.map((project) => {
          let cssClasses =
            "text-xs text-left w-full rounded py-2 px-4  hover:bg-slate-200 hover:shadow-lg";
          if (selectedprojectId === project.id) {
            cssClasses += " bg-slate-400 font-bold uppercase text-stone-900";
          } else {
            cssClasses += " bg-slate-200 font-normal  text-stone-600";
          }

          return (
            <li key={project.id} className='mt-2 font-bold'>
              <button
                onClick={() => onSelectProject(project.id)}
                className={cssClasses}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
