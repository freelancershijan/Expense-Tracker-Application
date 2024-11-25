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
        content = <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center my-10">
            <BoxLoading value="6" />
        </div>
    } else if (!isLoading && isError) {
        content = <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center my-10"><h1 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>{error?.data}</h1>
        </div>
    } else if (!isLoading && isSuccess && costCategories?.results?.data?.length === 0) {
        content = <div className='h-[100vh] px-6 flex items-center justify-center  my-10'>
            <h1 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>You Have not any Cost Category. Please Create a Cost Category FIrst</h1>
        </div>
    } else if (!isLoading && isSuccess && costCategories?.results?.data?.length > 0) {
        content = <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center my-10">
            {
                costCategories?.results?.data?.map(category => <Link key={category._id} to={`/cost-category/${ category?.name }`}>
                    <BoxItem bg="#FEE8E2" type="cost" title={category?.name} value={category?.money} isLoading={isLoading} />
                </Link>)
            } </div>
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