import React from 'react'
import image1 from '../../assets/images/budget-tracker.webp'

const AuthLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
                {children}
            </div>
            <div className='hidden md:block w-[40vw] h-screen bg-orange-50 bg-auth-bg-img bg-no-repeat bg-center overflow-hidden p-8 relative'>
                
                <img src={image1} className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 rounded-2xl' alt="" />
            </div>


        </div>

    )
}

export default AuthLayout