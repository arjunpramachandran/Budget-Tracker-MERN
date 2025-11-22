import React, { useContext, useState } from "react";
import { Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../../Context/userContext";



const DashboardNavbar = () => {
    const [showAdd, setShowAdd] = useState(false);
    const navigate = useNavigate()
    const { clearUser } = useContext(UserContext);
    const handleLogout = () => {
        clearUser()
        navigate("/login");
    };

    return (
        // navbar
        <>
            <div className="flex">

            </div>
            <div className="flex flex-row gap-6 mb-6">
                <button
                    onClick={() => setShowAdd(true)}
                    className="bg-violet-500 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Expense
                </button>
                <button
                    onClick={() => setShowAdd(true)}
                    className="bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Income
                </button>

                {/* logout button */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
            {showAdd && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-md p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Add Expense</h3>
                            <button onClick={() => setShowAdd(false)} className="text-gray-500">Close</button>
                        </div>

                        <form className="space-y-3">
                            <input className="w-full p-2 border rounded" placeholder="Title" />
                            <input className="w-full p-2 border rounded" placeholder="Amount" />
                            <select className="w-full p-2 border rounded">
                                <option>Food</option>
                                <option>Travel</option>
                                <option>Shopping</option>
                                <option>Bills</option>
                            </select>

                            <div className="flex justify-end">
                                <button onClick={(e) => { e.preventDefault(); setShowAdd(false); }}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

        </>



    );
};

export default DashboardNavbar;
