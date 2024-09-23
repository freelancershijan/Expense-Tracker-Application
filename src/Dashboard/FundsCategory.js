import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom/dist';
import AddFundCategory from '../Categories/AddFundCategory';
import BoxItem from '../Components/common/BoxItem';
import Search from '../Components/common/Search';
import BoxLoading from '../Components/Loading/BoxLoading';
import { AuthContext } from '../Context/AuthProvider';
import { useGetUserFundCategoriesQuery } from '../features/funds/fundsAPI';


const FundsCategory = () => {
    const { user } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    // Local state to hold the immediate input value
    const [inputValue, setInputValue] = useState("");
    // Debounced search state
    const [search, setSearch] = useState("");

    // Use debounce effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearch(inputValue);
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [inputValue]);

    const { data: fundCategories, isError, isLoading } = useGetUserFundCategoriesQuery({
        email: user?.email,
        page,
        limit
    });

    return (
        <div className='m-10'>

            <div className='text-end'>
                <Search search={inputValue} setSearch={setInputValue} />
            </div>

            {
                isLoading ?
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center">
                        <BoxLoading value="6" />
                    </div>
                    :
                    fundCategories?.results?.data?.length === 0 ? <div className='h-[100vh] px-6 flex items-center justify-center'>
                        <h1 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>You Have not any Fund Category. Please Create a Fund Category FIrst</h1>
                    </div> :
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center my-10">
                            {
                                fundCategories?.results?.data?.map(category => <Link key={category._id} to={`/${ category?.type }/${ category?.name }`}>
                                    <BoxItem bg="#E5F8ED" type="fund" title={category?.name} value={category?.money} isLoading={isLoading} />
                                </Link>)
                            }
                        </div>
            }

            <div className='fixed bottom-10 right-0 flex items-center gap-2'>
                <Link to='/delete-category'>
                    <div className='bg-red-700  group w-12 h-12 flex items-center justify-center rounded-full'>
                        <i className='pi pi-trash text-white'></i>
                    </div>
                </Link>
                <label htmlFor="category-modal">
                    <div className='bg-green-700 group cursor-pointer w-12 h-12 flex items-center justify-center rounded-full'>
                        <i className='pi pi-plus text-white'></i>
                    </div>
                </label>

            </div>

            <AddFundCategory />

        </div>
    );
};

export default FundsCategory;