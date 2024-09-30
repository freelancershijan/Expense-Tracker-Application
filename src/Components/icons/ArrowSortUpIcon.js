export default function ArrowSortUpIcon({ color }) {
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
          d="M18.2 13.3L12 7l-6.2 6.3c-.2.2-.3.5-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7"
        />
      </svg>
    </>

  );
}