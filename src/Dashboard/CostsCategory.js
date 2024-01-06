import React, { useContext } from 'react';
import { BiMoney } from 'react-icons/bi';
import { AuthContext } from '../Context/AuthProvider';
import AddCostCategory from '../Categories/AddCostCategory';
import { Link } from 'react-router-dom/dist';

const CostsCategory = () => {
    const { categories } = useContext(AuthContext);
    const cost = categories.filter(ctg => ctg.type === 'cost');
    return (
        <div>
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-10 gap-5 justify-center mt-10">


                {
                    cost.map(fctg => <Link key={fctg._id} to={`/${fctg?.type}/${fctg?.name}`}> <div class="lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center  bg-white rounded-lg shadow-lg">

                        <div class="bg-[#FEE8E2] rounded-full p-3">
                            <BiMoney className="w-6 h-6 text-red-500"></BiMoney>

                        </div>
                        <div class="">
                            <div class="text-lg font-semibold text-gray-800">${fctg.value}</div>
                            <p class="text-gray-700">{fctg.name}</p>
                        </div>
                    </div>
                    </Link>)
                }


            </div>


            <div className='md:flex items-center gap-5 w-1/2 mx-auto my-20 '>
                <div className='text-center'>
                    <label className='btn btn-primary  ' htmlFor="cost-category-modal">Add Cost Category</label>
                </div>

                <Link to='/delete-category'>
                    <div className='my-3'>
                        <label className='btn bg-red-700 hover:bg-red-900  ' htmlFor="category-modal" >Delete Category</label>
                    </div>
                </Link>
            </div>

            <AddCostCategory />


        </div>
    );
};

export default CostsCategory;