import React, { useState } from "react";
import { Plus ,LogOut} from "lucide-react";
import { useNavigate } from "react-router-dom";



const DashboardNavbar = ({ setShowAdd }) => {
    const navigate = useNavigate()
const handleLogout = () => {
    localStorage.removeItem("token");   
    navigate("/login");               
  };

    return (
        // navbar
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



    );
};

export default DashboardNavbar;
