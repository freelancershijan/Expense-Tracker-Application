import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { createUserWithEmailAndPassword, getAuth, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(' http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const [costs, setCosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/costs')
            .then(res => res.json())
            .then(data => setCosts(data))
    }, [])


    const [funds, setFunds] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/funds')
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
            const response = await axios.get('http://localhost:5000/funds');
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
            const response = await axios.get('http://localhost:5000/costs');
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



    // login and registration functionality


    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    console.log(user)
    const [loading, setLoading] = useState(true);

    console.log('authprovider', user)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('greenTechToken')
        return signOut(auth);

    }

    const verifyEmail = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }

    const passResetEmail = (email) => {
        return sendPasswordResetEmail(auth, email)
    }




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('inside changed', currentUser);
            setUser(currentUser);


            setLoading(false);

        });
        return () => {
            unsubscribe();
        }



    }, [])






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
        createUser,
        signInGoogle,
        user,
        signIn,
        logOut,
        updateUserProfile,
        loading,
        setLoading,
        passResetEmail,
        verifyEmail


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