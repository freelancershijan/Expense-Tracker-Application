import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useDeleteCostMutation } from "../../features/costs/costsAPI";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function DeleteModal({ showDeleteModal, setShowDeleteModal, item = {} }) {

  const [deleteCost, { isLoading, isSuccess, isError, error }] = useDeleteCostMutation();

  const dispatch = useDispatch;

  const handleClose = () => {
    // Allow the animation to run before closing
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    console.log("item._id", item._id);
    
    if (item._id) {
      deleteCost(item._id);
    } else {
      toast.error("Invalid item ID");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item Deleted Successfully");
      setShowDeleteModal(false);
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to delete the item");
    }
  }, [isSuccess, isError, error, setShowDeleteModal]);

  if (!showDeleteModal) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ${ showDeleteModal ? 'backdrop-enter' : 'backdrop-exit'
        }`}
    >
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Delete Confirmation</h2>
        <p>Are you sure you want to delete this item?</p>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={() => {
              setTimeout(handleClose, 300);
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading && <LoadingSpinner />}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
