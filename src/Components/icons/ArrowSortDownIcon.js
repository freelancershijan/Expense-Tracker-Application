export default function ArrowSortDownIcon({ color }) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        className={`${ color ? 'text-white' : 'text-gray-400' }`}
      >
        <path
          fill="currentColor"
          d="M5.8 9.7L12 16l6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3c-.2.2-.3.4-.3.7s.1.5.3.7"
        />
      </svg>
    </>

  );
}