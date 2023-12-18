import { useRef } from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onAddProject, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    // validate input ...
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    const projectData = {
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    };

    onAddProject(projectData);
  }

  return (
    <>
      <Modal ref={modal} buttonCaption='Okay'>
        <h2 className='my-4 text-xl font-bold text-red-400 text-center'>
          Invalid input
        </h2>
        <p className='mb-4 text-stone-600'>
          Ups! ... Looks like you missed a field{" "}
        </p>
        <p className='mb-4 text-stone-600'>
          Please make sure to provide a valid input for all fields
        </p>
      </Modal>
      <div className='w-[32rem] mt-16 '>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            <button
              onClick={onCancel}
              className='px-6 py-2 text-stone-800 bg-stone-200  hover:text-stone-900'
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className='px-6 py-2 rounded bg-amber-500 text-amber-900 hover:text-stone-800 hover:bg-teal-400 hover:shadow-xl '
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type='text' ref={title} label='Project name' />
          <Input ref={description} label='Description' textarea />
          <Input type='date' ref={dueDate} label='Due date' />
        </div>
      </div>
    </>
  );
}
