import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { createUserWithEmailAndPassword, getAuth, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);



    // login and registration functionality


    const googleProvider = new GoogleAuthProvider();


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



    // ************************************************ //


    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(' http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                const email = localStorage.getItem('userEmail');
                console.log('email from categories', email);
                const filtr = data.filter(ctg => ctg?.user == email)
                // console.log(filtr);
                setCategories(filtr);
            })
    }, [])

    const [costs, setCosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/costs')
            .then(res => res.json())
            .then(data => {
                const email = localStorage.getItem('userEmail');
                console.log('email from categories', email);
                const filtr = data.filter(ctg => ctg?.user == email)
                // console.log(filtr);
                setCosts(filtr);
            })
    }, [])


    const [funds, setFunds] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/funds')
            .then(res => res.json())
            .then(data => {
                const email = localStorage.getItem('userEmail');
                console.log('email from categories', email);
                const filtr = data.filter(ctg => ctg?.user == email)
                // console.log(filtr);
                setFunds(filtr);
            })
    }, [])


    const fundCategories = categories.filter(ctg => ctg?.type === 'fund');

    const costCategories = categories.filter(ctg => ctg?.type === 'cost');




    // current month funds value

    const getCurrentMonthFundsTotal = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const email = localStorage.getItem('userEmail');
        console.log('email from categories', email);
        const filtr = funds.filter(ctg => ctg?.user == email)

        const currentMonthFunds = filtr.filter(fund => {
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

        const email = localStorage.getItem('userEmail');
        console.log('email from categories', email);
        const filtr = costs.filter(ctg => ctg?.user == email)




        const currentMonthFunds = filtr.filter(fund => {
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
            console.log('response', response.data);

            const email = localStorage.getItem('userEmail');
            console.log('email from categories', email);
            const filtr = response?.data.filter(ctg => ctg?.user == email)





            const earnings = filtr.filter((earning) => {
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

            const email = localStorage.getItem('userEmail');
            console.log('email from categories', email);
            const filtr = response?.data.filter(ctg => ctg?.user == email)




            const earnings = filtr.filter((earning) => {
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


    const email = localStorage.getItem('userEmail');
    console.log('email from categories', email);
    const filtr = fundCategories.filter(ctg => ctg?.user == email)


    const fundss = filtr.map(fnd => fnd?.value);
    const sum = fundss.reduce((acc, val) => acc + val, 0);



    const filtrr = costCategories.filter(ctg => ctg?.user == email)



    const costss = filtrr.map(fnd => fnd?.value);
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