import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddCostCategory from "../Categories/AddCostCategory";
import BoxItem from "../Components/common/BoxItem";
import BoxLoading from "../Components/Loading/BoxLoading";
import Pagination from "../Components/pagination/Pagination";
import { AuthContext } from "../Context/AuthProvider";

import { useGetUserCostCategoriesQuery } from "../features/categories/categoryAPI";
import CategoryLayout from "../Layout/CategoryLayout";
import { GridLayout, MessageLayout } from "./FundsCategory";

const CostsCategory = () => {
    const { user } = useContext(AuthContext);
    const { page, limit = 12, search } = useSelector((state) => state.filters);
    const [showModal, setShowModal] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    const { data: costCategories, isLoading, isSuccess, isError, error } = useGetUserCostCategoriesQuery({
        user: user?.email,
        page,
        limit: 12,
        search
    });

    const { totalPages, totalResults } = costCategories?.results || {};

    let pagination;
    if (!isLoading) {
        pagination = <div className='bg-white p-3 rounded-lg shadow-lg'>
            <Pagination pages={totalPages} total={totalResults} />
        </div>
    }

    let content;
    if (isLoading) {
        content = <GridLayout>
            <BoxLoading value="6" />
        </GridLayout>
    } else if (!isLoading && isError) {
        content = <MessageLayout>
            <h1 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>{error?.data}</h1>
        </MessageLayout>
    } else if (!isLoading && isSuccess && costCategories?.results?.data?.length === 0) {
        content = <MessageLayout>
            <h1 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>You Have not any Cost Category. Please Create a Cost Category FIrst</h1>
        </MessageLayout>
    } else if (!isLoading && isSuccess && costCategories?.results?.data?.length > 0) {
        content = <GridLayout>
            {
                costCategories?.results?.data?.map(category => <Link key={category._id} to={`/cost-category/${ category?.name }`}>
                    <BoxItem key={category._id}
                        bg="#FEE8E2" type="cost" title={category?.name} value={category?.money} isLoading={isLoading} />
                </Link>)
            } </GridLayout>
    }

    return (
        <CategoryLayout title="Cost Categories" setShowModal={setShowModal}>
            {content}

            {pagination}

            {
                showModal &&
                <AddCostCategory
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setIsCreate={setIsCreate}
                />
            }
        </CategoryLayout>
    );
};

export default CostsCategory;