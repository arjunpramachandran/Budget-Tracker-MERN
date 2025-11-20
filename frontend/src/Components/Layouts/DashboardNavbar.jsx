import React, { useState } from "react";
import { Plus } from "lucide-react";



const DashboardNavbar = ({ setShowAdd }) => {


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
        </div>



    );
};

export default DashboardNavbar;
