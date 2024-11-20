export default function BaseModal({ children, showDeleteModal, setShowDeleteModal }) {

  const handleClose = () => {
    // Allow the animation to run before closing
    setShowDeleteModal(false);
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ${
        showDeleteModal ? 'backdrop-enter' : 'backdrop-exit'
      }`}
    >
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Delete Confirmation</h2>
        <p>Are you sure you want to delete this item?</p>

        {children}

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={() => {
              setTimeout(handleClose, 300);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => {
              console.log('Delete action confirmed');
              setShowDeleteModal(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
