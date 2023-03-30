import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../../Context/AuthProvider';
import { setAuthToken } from '../../../api/authApi';
// import useTitle from '../../../hoocks/useTitle';


const Login = () => {
    // useTitle('Login')


    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const { signInGoogle, loading, setLoading, signIn } = useContext(AuthContext)

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                localStorage.setItem("userEmail", user?.email);
                form.reset();
                setError('');
                setAuthToken(result.user)
                navigate('/dashboard');
                console.log('Login User from form', user)
            })
            .catch(error => {
                console.error('SIgn In from From User', error)
                setError(error.message);
                setLoading(false);
            })

    }
    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                const user = result.user;
                localStorage.setItem("userEmail", user?.email);
                setAuthToken(result.user)
                console.log('New User From Google', user);
                navigate('/dashboard')
            })
            .catch(error => {
                console.error('Google User SIgn In error', error);
                toast.error(error.message)
            })
    }



    return (



        <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in to COntinue</h2>
                        <p className="mt-2 text-base text-gray-600">Don’t have an account? <Link to='/register' title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Create a free account</Link></p>

                        <form onSubmit={handleSubmit} method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900"> Email address </label>
                                    <div className="mt-2.5">
                                        <input

                                            required
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter email to get started"
                                            className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900"> Password </label>

                                        <Link to='/reset-password' className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"> Forgot password? </Link>
                                    </div>
                                    <div className="mt-2.5">
                                        <input
                                            type="password"
                                            required
                                            name="password"
                                            id="password"
                                            placeholder="Enter your password"
                                            className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>

                                <div className='text-red-600'>
                                    {error}
                                </div>

                                <div>
                                    <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                        {
                                            loading ? <LoadingSpinner></LoadingSpinner> : 'Log In'
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-3 space-y-3">
                            <button
                                onClick={handleGoogleSignIn}
                                type="button"
                                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                            >
                                <div className="absolute inset-y-0 left-0 p-4">
                                    <FaGoogle className='w-6 h-6'></FaGoogle>
                                </div>
                                Sign in with Google
                            </button>


                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div>
                        <img className="w-full mx-auto" src="https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />

                        <div className="w-full max-w-md mx-auto xl:max-w-xl">
                            <h3 className="text-2xl mt-5 font-bold text-center text-black">Make Your Own Life</h3>
                            <p className="leading-relaxed text-center text-gray-500 mt-2.5">If you want to be a successful man then you need to more hardwork.</p>


                        </div>
                    </div>
                </div>
            </div>
        </section>




    );
};

export default Login;