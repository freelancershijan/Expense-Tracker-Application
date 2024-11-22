import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCreateUserFundCategoryMutation } from '../features/funds/fundsAPI';
import BaseInput from './../Components/inputs/BaseInput';
import BaseModal from "./../Components/modal/BaseModal";
import { AuthContext } from './../Context/AuthProvider';

export default function AddFundCategory({ showModal, setShowModal, setIsCreate }) {
    const {user} = useContext(AuthContext);
    const [categoryName, setCategoryName] = useState('');
    const [showError, setShowError] = useState(false);

    const [addCategory, { isLoading , isSuccess, isError, error}] = useCreateUserFundCategoryMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            setShowError(true);
            return;
        }

        const data = {
            name: categoryName,
            email: user?.email,
            type: 'fund'
        };

        addCategory(data);
        
        setIsCreate(true);
        setShowModal(false);
    };

    useEffect(() => {    
        if (isSuccess) {
            setIsCreate(true);
            setShowModal(false);
            toast.success('Category Created Successfully');
            setCategoryName('');
        } if(isError) toast.error(error?.data?.message);
    }, [isSuccess, isError, error]);


    return (
        <BaseModal
            showModal={showModal}
            setShowModal={setShowModal}
            setIsCreate={setIsCreate}
            title="Add Fund Category"
            isLoading={isLoading}
            handleSubmit={handleSubmit}
        >
            <BaseInput
                required
                label="Category Name"
                value={categoryName}
                setValue={(value) => {
                    setCategoryName(value)
                    setShowError(false);
                }}
                showError={showError}
                errorMessage="Category Field is Required"
                placeholder="Enter Category Name"
            />
        </BaseModal>
    );
}
