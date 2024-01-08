import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import img from '../../../images/Forgot password-amico.png'


const ResetPass = () => {
    const { passResetEmail } = useContext(AuthContext)
    const [userEmail, setUserEmail] = useState('');
    const handleSubmit = event => {
        event.preventDefault();
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
    }

    const handlePassReset = () => {
        if (!userEmail) {
            toast.error('Please Enter Your EMail Address');
            return;
        }
        passResetEmail(userEmail)
            .then(() => {
                toast.success('Password Reset EMail Send. Check your email')
            })
            .catch(error => {
                console.error('password reset error', error.message)
            })
    }

    return (
        <div className='bg-background h-full'>
            <div className='max-w-7xl mx-auto px-6 flex flex-col-reverse md:grid md:grid-cols-2 grid-cols-1 items-center gap-20 py-10'>
                <div className='w-full rounded-sm sm:px-10 px-5 sm:py-16 py-10 bg-white'>
                <form onSubmit={handleSubmit} className="">
                        <div className="">
                            <h2 className='md:text-2xl sm:text-xl text-lg font-semibold mb-10 text-center'>Do You Want to Reset Your Password!!!</h2>
                            <input
                                onBlur={handleEmailBlur}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter email address"
                                className="block mt-5 w-full sm:py-4 py-2 pl-10 pr-4 text-base text-black bg-gray-200 placeholder-gray-500 transition-all duration-200 border-gray-200 rounded-md sm:rounded-r-none caret-blue-600 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                required
                            />
                            <div className="card-actions justify-center mt-5">
                                <button onClick={handlePassReset} className="w-full sm:py-4 py-2 bg-primary text-white rounded-sm">Reset Password</button>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div>
                    <div className='p-10'>
                        <img className='w-full h-full' src={img} alt="" />
                    </div>
                </div>
            </div>
       </div>
    );
};

export default ResetPass;