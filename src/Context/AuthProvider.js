import axios from 'axios';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const email = localStorage.getItem('userEmail');

    // login and registration functionality
    const googleProvider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true);
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
        fetch(`${ process.env.REACT_APP_API_URL }/categories`)
            .then(res => res.json())
            .then(data => {
                const filtr = data.filter(ctg => ctg?.user === email)
                setCategories(filtr);
            })
    }, [email])

    // recent fund post
    const [recent, setRecent] = useState([]);
    useEffect(() => {
        fetch(`${ process.env.REACT_APP_API_URL }/fundss/${ email }`)
            .then(res => res.json())
            .then(data => {
                setRecent(data);
            })
    }, [email])

    // recent Cost post
    const [recentCost, setRecentCost] = useState([]);
    useEffect(() => {
        fetch(`${ process.env.REACT_APP_API_URL }/costss/${ email }`)
            .then(res => res.json())
            .then(data => {
                setRecentCost(data);
            })
    }, [email])


    const [costs, setCosts] = useState([]);
    useEffect(() => {
        fetch(`${ process.env.REACT_APP_API_URL }/costs`)
            .then(res => res.json())
            .then(data => {
                const filtr = data.filter(ctg => ctg?.user === email)
                setCosts(filtr);
            })
    }, [email])


    const [funds, setFunds] = useState([]);
    useEffect(() => {
        fetch(`${ process.env.REACT_APP_API_URL }/funds`)
            .then(res => res.json())
            .then(data => {
                const filtr = data.filter(ctg => ctg?.user === email)
                setFunds(filtr);
            })
    }, [email])

    // Get user Details

    const [userDetails, setUserDetails] = useState({})
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/user-details?user=${ email }`);
                console.log('Result: ', result.data.result);
                setUserDetails(result.data.result);
            } catch (error) {
                console.error('Error fetching user details: ', error);
            }
        };

        fetchUserDetails();
    }, [email])

    const fundCategories = categories.filter(ctg => ctg?.type === 'fund');
    const costCategories = categories.filter(ctg => ctg?.type === 'cost');


    // current month funds value
    const getCurrentMonthFundsTotal = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const filtr = funds.filter(ctg => ctg?.user === email)
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
        const filtr = costs.filter(ctg => ctg?.user === email)
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
            const response = await axios.get(`${ process.env.REACT_APP_API_URL }/funds`);
            const filtr = response?.data.filter(ctg => ctg?.user === email)
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
    }, [email]);


    // previous month Cost value
    const [totalCosts, setTotalCosts] = useState(0);
    useEffect(() => {
        const getPreviousMonthEarnings = async () => {
            const response = await axios.get(`${ process.env.REACT_APP_API_URL }/costs`);
            const filtr = response?.data.filter(ctg => ctg?.user === email)
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
    }, [email]);

    const fundss = fundCategories.map(fnd => fnd?.value);
    // console.log('all Funds,', fundss);
    const sum = fundss.reduce((acc, val) => acc + val, 0);
    const costss = costCategories.map(fnd => fnd?.value);
    // console.log('all costs,', costss);
    const cost = costss.reduce((acc, val) => acc + val, 0);

    const authInfo = {
        categories,
        recent,
        recentCost,
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
        verifyEmail,
        email,
        userDetails

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