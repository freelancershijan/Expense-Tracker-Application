import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCreateUserCategoryMutation } from '../features/categories/categoryAPI';
import BaseInput from './../Components/inputs/BaseInput';
import BaseModal from "./../Components/modal/BaseModal";
import { AuthContext } from './../Context/AuthProvider';

export default function AddFundCategory({ showModal, setShowModal, setIsCreate }) {
    const { user } = useContext(AuthContext);
    const [categoryName, setCategoryName] = useState('');
    const [showError, setShowError] = useState(false);

    const [createCategory, { isLoading, isSuccess, isError, error, reset }] = useCreateUserCategoryMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            setShowError(true);
            return;
        }

        const data = {
            name: categoryName,
            user: user?.email,
            type: 'fund',
            money: 0
        };

        createCategory(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Category Created Successfully');
            setIsCreate(true);
            setShowModal(false);
            setCategoryName('');
            reset();
        } if (isError) {
            toast.error(error?.data?.message);
            reset();
        }
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
