import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/dist';
import AddFundCategory from '../Categories/AddFundCategory';
import BoxItem from '../Components/common/BoxItem';
import BoxLoading from '../Components/Loading/BoxLoading';
import Pagination from '../Components/pagination/Pagination';
import { AuthContext } from '../Context/AuthProvider';
import { useGetUserFundCategoriesQuery } from '../features/funds/fundsAPI';
import CategoryLayout from '../Layout/CategoryLayout';

const FundsCategory = () => {
    const { user } = useContext(AuthContext);
    const { page, limit, search } = useSelector((state) => state.filters);
    const [showModal, setShowModal] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    const { data: fundCategories, isLoading } = useGetUserFundCategoriesQuery({
        email: user?.email,
        page,
        limit,
        search
    });

    const { totalPages, totalResults } = fundCategories?.results || {};

    let pagination;
    if (!isLoading) {
        pagination = <div className='bg-white p-3 rounded-lg shadow-lg my-10'>
            <Pagination pages={totalPages} total={totalResults} />
        </div>
    }

    return (
        <CategoryLayout title="Fund Categories" setShowModal={setShowModal} >

            {
                isLoading ?
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center my-10">
                        <BoxLoading value="6" />
                    </div>
                    :
                    fundCategories?.results?.data?.length === 0 ? <div className='h-[100vh] px-6 flex items-center justify-center'>
                        <h1 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>You Have not any Fund Category. Please Create a Fund Category FIrst</h1>
                    </div> :
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center my-10">
                            {
                                fundCategories?.results?.data?.map(category => <Link key={category?._id} to={`/fund-category/${ category?.name }`}>
                                    <BoxItem bg="#E5F8ED" type="fund" title={category?.name} value={category?.money} isLoading={isLoading} />
                                </Link>)
                            }
                        </div>
            }

            {pagination}

            {
                showModal &&
                <AddFundCategory
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setIsCreate={setIsCreate}
                />
            }

        </CategoryLayout>
    );
};

export default FundsCategory;