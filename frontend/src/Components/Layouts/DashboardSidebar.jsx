import React from 'react'
import { Plus, Menu, Home, PieChart as PieIcon, BarChart2 } from "lucide-react";

const DashboardSidebar = ({ sidebarOpen, toggleSidebar ,openCategoryModal}) => {
    return (
        <div>
             <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md absolute top-4 left-4 z-100 hover:bg-gray-100">
                        <Menu />
                    </button>
            <aside
                className={`bg-white border-r h-screen p-4 transition-all duration-300  z-20
                    ${sidebarOpen ? "w-64" : "w-0 absolute"}
                         overflow-hidden
                    
                    `}
            >
                <div className="flex items-center gap-3 mb-6">
                   
                    {sidebarOpen && <h1 className="text-xl font-bold">Budget</h1>}
                </div>

                <nav className="flex flex-col gap-2">
                    <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                        <Home />
                        {sidebarOpen && <span>Home</span>}
                    </a>
                    <button
                        onClick={openCategoryModal}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                    >
                        <PieIcon />
                        {sidebarOpen && <span>Categories</span>}
                    </button>
                    <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                        <BarChart2 />
                        {sidebarOpen && <span>Reports</span>}
                    </a>
                </nav>

                <div className="mt-auto text-sm text-gray-500 p-2">
                    {sidebarOpen ? "Logged in as Arjun" : ""}
                </div>
            </aside>
        </div>
    )
}

export default DashboardSidebar