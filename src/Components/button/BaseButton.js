export default function BaseButton({children}){
    return (
      <button className="bg-primary text-white p-2 rounded-lg">
        {children}
      </button>
    );
}