import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/dist';
import BaseButton from '../Components/button/BaseButton';
import Search from '../Components/common/Search';
import { PlusIcon } from '../Components/icons/PlusIcon';
import RefreshIcon from '../Components/icons/RefreshIcon';
import { setRefresh } from '../features/filters/filterSlice';
import { DeleteIcon } from './../Components/icons/DeleteIcon';

const CategoryLayout = ({ children, title = "Categories", setShowModal }) => {
  const dispatch = useDispatch();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    dispatch(setRefresh());
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <div>

      <div className='flex justify-between items-center bg-white p-3 rounded-lg shadow-md'>
      <div>
        <h1 className="text-xl font-semibold text-primary capitalize">{title}</h1>
      </div>
      <div className='flex justify-end gap-5'>
        <div>
          <Search refreshTrigger={refreshTrigger} width="w-64" />
        </div>
        <BaseButton handleClick={handleRefresh}>
          <RefreshIcon />
        </BaseButton>
      </div>
      </div>

      {children}

      <div className='fixed bottom-10 right-0 flex items-center gap-2'>
        <Link to='/delete-category'>
          <div className='bg-red-700  group w-12 h-12 flex items-center justify-center rounded-full'>
            <DeleteIcon className="text-white size-6" />
          </div>
        </Link>
        <label htmlFor="category-modal">
          <div onClick={() => setShowModal(true)} className='bg-green-700 group cursor-pointer w-12 h-12 flex items-center justify-center rounded-full'>
            <PlusIcon className="text-white size-7" />
          </div>
        </label>

      </div>
    </div>
  );
};

export default CategoryLayout;