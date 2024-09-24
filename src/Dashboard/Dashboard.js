import React, { useContext } from 'react';
import BoxItem from '../Components/common/BoxItem';
import { AuthContext } from '../Context/AuthProvider';
import { useGetUserDetailsQuery } from '../features/user/userAPI';
import PieChart from './../Components/PieChart';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const { data: userDetails, isError, isLoading } = useGetUserDetailsQuery(user?.email);

    // Add a fallback for when userDetails is undefined
    const {
        totalExpense,
        totalIncome,
        currentMonthExpense,
        prevMonthMonthExpense,
        currentMonthFund,
        prevMonthFund,
        restFund
    } = userDetails?.result || {};

    return (
        <div className='mx-2 md:mx-10'>

            <div>
                <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 justify-center mt-10">
                    <BoxItem bg="#E5F8ED" type="fund" title="Total Funds" value={totalIncome?.money} isLoading={isLoading} />

                    <BoxItem bg="#FEE8E2" type="cost" title="Total Costs" value={totalExpense?.money} isLoading={isLoading} />

                    <BoxItem bg="#E5F8ED" type="fund" title="This Month Funds" value={currentMonthFund?.money} isLoading={isLoading} />

                    <BoxItem bg="#FEE8E2" type="cost" title="This Month Costs" value={currentMonthExpense?.money} isLoading={isLoading} />
                </div>

                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center mt-5">
                    <BoxItem bg="#E5F8ED" type="fund" title="Previous Month Funds" value={prevMonthFund?.money} isLoading={isLoading} />

                    <BoxItem bg="#FEE8E2" type="cost" title="Previous Month Costs" value={prevMonthMonthExpense?.money} isLoading={isLoading} />

                    <BoxItem mainBg="#1B2850" type="rest" title="Rest Funds" value={restFund?.money} isLoading={isLoading} />
                </div>
            </div>

           {/*  <div className='my-10'>
                <Recent />
            </div> */}

            <div className='my-10'>
                <PieChart />
            </div>
        </div>
    );
};

export default Dashboard;