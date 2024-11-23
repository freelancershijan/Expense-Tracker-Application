import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function BaseModal({
  children,
  showModal = false,
  setShowModal,
  setIsCreate,
  isLoading = false,
  title = "",
  handleSubmit
}) {
  const handleClose = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ${ showModal ? "backdrop-enter" : "backdrop-exit"
        }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <form action="" onSubmit={handleSubmit}>
          <div className="border-b p-4">
            <h2 className="text-lg font-bold">{title}</h2>
          </div>

          <div className="py-8 p-4">
            {children}
          </div>

          <div className="flex justify-end p-4 border-t">
            <button
             type="button"
              className="px-4 py-2 bg-gray-300 rounded mr-2"
              onClick={() => {
                setTimeout(handleClose, 300); // Add delay if needed
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => {
                if (!isLoading) setIsCreate(true);
              }}
              disabled={isLoading}
            >
              <span className="flex items-center gap-3">
                {isLoading && <LoadingSpinner color="white" />}
                Confirm
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
