import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-600 bg-stone-200 text-stone-600 focus:outline-none focus:border-amber-600";
  return (
    <p className='flex flex-col gap-2 my-4'>
      <label className='text-sm font-bold uppercase text-stone-600'>
        {label}
      </label>
      {textarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} {...props} />
      )}
    </p>
  );
});

export default Input;
