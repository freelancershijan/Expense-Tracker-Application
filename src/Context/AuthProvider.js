import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(' https://expense-tracker-application-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const [costs, setCosts] = useState([]);

    useEffect(() => {
        fetch('https://expense-tracker-application-server.vercel.app/costs')
            .then(res => res.json())
            .then(data => setCosts(data))
    }, [])


    const [funds, setFunds] = useState([]);

    useEffect(() => {
        fetch('https://expense-tracker-application-server.vercel.app/funds')
            .then(res => res.json())
            .then(data => setFunds(data))
    }, [])


    const fundCategories = categories.filter(ctg => ctg?.type === 'fund');

    const costCategories = categories.filter(ctg => ctg?.type === 'cost');




    // current month funds value

    const getCurrentMonthFundsTotal = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const currentMonthFunds = funds.filter(fund => {
            const fundDate = new Date(fund.date);
            const fundMonth = fundDate.getMonth() + 1;
            const fundYear = fundDate.getFullYear();

            return (fundMonth === currentMonth && fundYear === currentYear);
        });

        const total = currentMonthFunds.reduce((accumulator, fund) => {
            return accumulator + fund.money;
        }, 0);

        return total;
    }


    // current month Costs value

    const getCurrentMonthCostsTotal = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const currentMonthFunds = costs.filter(fund => {
            const fundDate = new Date(fund.date);
            const fundMonth = fundDate.getMonth() + 1;
            const fundYear = fundDate.getFullYear();

            return (fundMonth === currentMonth && fundYear === currentYear);
        });

        const total = currentMonthFunds.reduce((accumulator, fund) => {
            return accumulator + fund.money;
        }, 0);

        return total;
    }



    // previous month fund value

    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        const getPreviousMonthEarnings = async () => {
            const response = await axios.get('https://expense-tracker-application-server.vercel.app/funds');
            const earnings = response.data.filter((earning) => {
                const earningMonth = new Date(earning.date).getMonth();
                const currentMonth = new Date().getMonth();
                const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // January is month 0
                return earningMonth === previousMonth;
            });
            const total = earnings.reduce((acc, curr) => acc + curr.money, 0);
            setTotalEarnings(total);
        };

        getPreviousMonthEarnings();
    }, []);




    // previous month Cost value

    const [totalCosts, setTotalCosts] = useState(0);

    useEffect(() => {
        const getPreviousMonthEarnings = async () => {
            const response = await axios.get('https://expense-tracker-application-server.vercel.app/costs');
            const earnings = response.data.filter((earning) => {
                const earningMonth = new Date(earning.date).getMonth();
                const currentMonth = new Date().getMonth();
                const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // January is month 0
                return earningMonth === previousMonth;
            });
            const total = earnings.reduce((acc, curr) => acc + curr.money, 0);
            setTotalCosts(total);
        };

        getPreviousMonthEarnings();
    }, []);




    const fundss = fundCategories.map(fnd => fnd?.value);
    const sum = fundss.reduce((acc, val) => acc + val, 0);


    const costss = costCategories.map(fnd => fnd?.value);
    const cost = costss.reduce((acc, val) => acc + val, 0);
    // console.log(sum);





    const authInfo = {
        categories,
        funds,
        sum,
        cost,
        costs,
        fundCategories,
        costCategories,
        getCurrentMonthFundsTotal,
        getCurrentMonthCostsTotal,
        totalEarnings,
        totalCosts,


    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;