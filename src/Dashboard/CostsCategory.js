import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/dist';
import AddCostCategory from '../Categories/AddCostCategory';
import BoxItem from '../Components/common/BoxItem';
import Search from '../Components/common/Search';
import BoxLoading from '../Components/Loading/BoxLoading';
import Pagination from '../Components/pagination/Pagination';
import { AuthContext } from '../Context/AuthProvider';
import { useGetUserCostCategoriesQuery } from '../features/costs/costsAPI';

const CostsCategory = () => {
    const { user } = useContext(AuthContext);
    const { page, limit, search } = useSelector((state) => state.filters);

    const { data: costCategories, isError, isLoading } = useGetUserCostCategoriesQuery({
        email: user?.email,
        page,
        limit,
        search
    });

    const { totalPages, totalResults } = costCategories?.results || {};

    let pagination;
    if (!isLoading) {
        pagination = <div className='bg-white p-3 rounded-lg shadow-lg'>
            <Pagination pages={totalPages} total={totalResults} />
        </div>
    }

    return (
        <div className='p-10'>

            <div className='text-end'>
                <Search />
            </div>

            {
                isLoading ?
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center  my-10">
                        <BoxLoading value="6" />
                    </div>
                    :
                    costCategories?.results?.data?.length === 0 ? <div className='h-[100vh] px-6 flex items-center justify-center  my-10'>
                        <h1 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>You Have not any Cost Category. Please Create a Cost Category FIrst</h1>
                    </div> :
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center my-10">
                            {
                                costCategories?.results?.data?.map(category => <Link key={category._id} to={`/cost/${ category?.name }`}>
                                    <BoxItem bg="#FEE8E2" type="cost" title={category?.name} value={category?.money} isLoading={isLoading} />
                                </Link>)
                            }
                        </div>
            }

            {pagination}

            <div className='fixed bottom-10 right-0 flex items-center gap-2'>
                <Link to='/delete-category'>
                    <div className='bg-red-700  group w-12 h-12 flex items-center justify-center rounded-full'>
                        <i className='pi pi-trash text-white'></i>
                    </div>
                </Link>
                <label htmlFor="cost-category-modal">
                    <div className='bg-green-700 group cursor-pointer w-12 h-12 flex items-center justify-center rounded-full'>
                        <i className='pi pi-plus text-white'></i>
                    </div>
                </label>

            </div>

            <AddCostCategory />


        </div>
    );
};

export default CostsCategory;