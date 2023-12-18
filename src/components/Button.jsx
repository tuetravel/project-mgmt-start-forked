export default function Button({ children, ...props }) {
  return (
    <button {...props} className="px-4 py-2 text-xs md:text-base rounded-md bg-amber-500 text-amber-950 hover:bg-teal-400 hover:shadow-xl">
      {children}
    </button>
  );
}
