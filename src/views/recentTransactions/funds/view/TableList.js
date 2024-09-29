import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseTableList from '../../../../Components/table/BaseTableList';
import { setLimit } from '../../../../features/filters/filterSlice';
import { useGetUserRecentFundsTransactionsQuery } from '../../../../features/funds/fundsAPI';
import { AuthContext } from './../../../../Context/AuthProvider';
import TableRowItem from './TableRowItem';

export default function TableList() {
    const { user } = useContext(AuthContext);
    const { page, limit, search, sort_by, sort_order } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLimit(10));
    }, [dispatch, setLimit])

    // Check if user email is available before making the query
    const { data: recentCostsTransactions, isError, isLoading } = useGetUserRecentFundsTransactionsQuery({
        email: user?.email,
        page,
        limit,
        sort_by,
        sort_order,
        search
    }, {
        skip: !user?.email,
    });

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

    return (
        <div>
            <BaseTableList
                columns={columns}
                values={recentCostsTransactions?.results?.data?.map(item => (
                    <TableRowItem
                        key={item._id} // Ensure each row has a unique key
                        rowData={item}
                    />
                ))}
                total={recentCostsTransactions?.results?.totalAmount}
                isLoading={isLoading}
                isError={isError}
                isShowDelete={false}
                isShowSearch={false}
            >

            </BaseTableList>
        </div>
    );
}