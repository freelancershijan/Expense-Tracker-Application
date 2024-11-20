export default function BaseButton({handleClick, children}){
    return (
      <button onClick={handleClick} className="bg-primary text-white p-2 rounded-lg">
        {children}
      </button>
    );
}