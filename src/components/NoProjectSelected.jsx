import noProjectImage from "../assets/no-projects.png";
import Button from "./Button.jsx";

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className='mt-24 text-center w-2/3'>
      <img
        src='https://media.giphy.com/media/l0IyjiXOXTX6Yemsg/giphy.gif'
        className='w-64 h-64object-contain mx-auto'
        alt='An empty task list'
      />
      <h2 className='my-4 text-xl font-bold text-stone-500 text-center'>
        No project selected
      </h2>
      <p className='mb-4 text-stone-400'>
        Select a project from the sidebar or create a new one.
      </p>
      <p className='mt-8'>
        <Button onClick={onStartAddProject}>Create a new project</Button>
      </p>
    </div>
  );
}
