import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteModal from "../Components/modal/DeleteModal";
import BaseTableList from "../Components/table/BaseTableList";
import { AuthContext } from "../Context/AuthProvider";
import { useDeleteCostMutation, useGetUserCategoryCostListsQuery } from "../features/costs/costsAPI";
import CostCategoryTableRowItem from "./CostCategoryTableRowItem";

export default function CostCategoryLists() {
    const { user } = useContext(AuthContext);
    const { category } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [item, setItem] = useState({});

    const { page, limit, sort_by, search, sort_order, start_date, end_date } = useSelector((state) => state.filters);

    const { data: lists, isLoading, isError, error } = useGetUserCategoryCostListsQuery({
        email: user?.email,
        category,
        page,
        limit,
        sort_by,
        sort_order,
        search,
        start_date,
        end_date
    })

    const columns = [
        {
            name: 'Date',
            sort_by: 'date',
            sort_order: '',
            isSort: true,
        },
        {
            name: 'Category',
            sort_by: 'category',
            sort_order: '',
            isSort: true,
        },
        {
            name: 'Amount',
            sort_by: 'money',
            sort_order: '',
            isSort: true,
        },
        {
            name: 'Note',
            sort_by: 'notes',
            sort_order: '',
            isSort: true,
        },
        {
            name: 'Time',
            sort_by: 'time',
            sort_order: '',
            isSort: true,
        }
    ]

    const breadcrumbs = [
        {
            id: 1,
            name: "Costs",
            path: "/cost-category",
        },
        {
            id: 2,
            name: category,
            path: "",
        }
    ];

    const [deleteCost, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] = useDeleteCostMutation();

    const handleDelete = () => {
        if (item._id) {
            deleteCost(item._id);
        } else {
            toast.error("Invalid item ID");
        }
    };

    useEffect(() => {
        if (isDelete) {
            handleDelete();
            setIsDelete(false);
        }
    }, [isDelete])

    useEffect(() => {
        if (isDeleteSuccess) {
            toast.success("Item Deleted Successfully");
            setShowDeleteModal(false);
        }
        if (isDeleteError) {
            toast.error(deleteError?.data?.message || "Failed to delete the item");
        }
    }, [isDeleteSuccess, isDeleteError, deleteError, setShowDeleteModal]);

    return (
        <div>
            <BaseTableList
                columns={columns}
                values={lists?.results?.data?.map(item => (
                    <CostCategoryTableRowItem
                        key={item._id}
                        rowData={item}
                        setShowModal={setShowModal}
                        setShowDeleteModal={setShowDeleteModal}
                        setItem={setItem}
                    />
                ))}
                total={lists?.results?.totalAmount}
                isLoading={isLoading}
                isError={isError}
                error={error}
                breadcrumbs={breadcrumbs}
            />

            {/* <EditCostModal /> */}
            {showDeleteModal && (
                <DeleteModal
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    setIsDelete={setIsDelete}
                    isLoading={isDeleteLoading}
                />
            )}
        </div>
    );
}