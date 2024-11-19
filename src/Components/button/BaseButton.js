export default function BaseButton({handleRefresh, children}){
    return (
      <button onClick={handleRefresh} className="bg-primary text-white p-2 rounded-lg">
        {children}
      </button>
    );
}