import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "framer-motion";
import { Plus, Menu, Home, PieChart as PieIcon, BarChart2 } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import CategoryModal from "../CategoryModal";




// Mock data
const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
];

const chartData = [
    { name: "1 Jun", spent: 400 },
    { name: "6 Jun", spent: 800 },
    { name: "11 Jun", spent: 300 },
    { name: "16 Jun", spent: 900 },
    { name: "21 Jun", spent: 500 },
    { name: "26 Jun", spent: 1200 },
];

const categoryData = [
    { name: "Food", color: "#ff6b6b", spent: 4200, limit: 5000 },
    { name: "Travel", color: "#4dabf7", spent: 3000, limit: 2500 },
    { name: "Shopping", color: "#845ef7", spent: 1200, limit: 3000 },
    { name: "Bills", color: "#40c057", spent: 800, limit: 2000 },
];

const expenseBreakdown = [
    { name: "Food", value: 4200 },
    { name: "Travel", value: 3000 },
    { name: "Shopping", value: 1200 },
    { name: "Bills", value: 800 },
];

const COLORS = ["#ff6b6b", "#4dabf7", "#845ef7", "#40c057"];

export default function DashboardLayout() {
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const now = new Date();
    const [month, setMonth] = useState(`${months[now.getMonth()]} ${now.getFullYear()}`);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth < 768 ? false : true);
    const [showAdd, setShowAdd] = useState(false);


    const toggleSidebar = () => {
        if (window.innerWidth < 768) setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">

            <DashboardSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} openCategoryModal={() => setCategoryModalOpen(true)} />
            <div className="flex-1 p-6">
                {/* Header */}
                

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Charts */}
                    <div className="lg:col-span-2 space-y-6">

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-2xl shadow">
                            <h3 className="font-semibold mb-2">Spending Over Time</h3>
                            <div style={{ height: 260 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="spent" stroke="#4dabf7" strokeWidth={3} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-4 rounded-2xl shadow flex gap-6">
                            <div style={{ width: 240, height: 240 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={expenseBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                            {expenseBreakdown.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex-1">
                                <h4 className="font-semibold">Category Breakdown</h4>
                                <ul className="mt-4 space-y-4">
                                    {categoryData.map((c) => {
                                        const percent = Math.round((c.spent / Math.max(c.limit, c.spent)) * 100);
                                        const over = c.spent > c.limit;
                                        return (
                                            <li key={c.name} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                                                    <div>
                                                        <div className="font-medium">{c.name}</div>
                                                        <div className="text-xs text-gray-500">Spent: ₹{c.spent} • Limit: ₹{c.limit}</div>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-sm font-semibold">{percent}%</div>
                                                    {over && <div className="text-xs text-red-600">OVER</div>}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </motion.div>

                    </div>

                    {/* Right: Category cards */}
                    <div className="space-y-6">
                        {categoryData.map((cat, idx) => {
                            const percent = Math.min(100, Math.round((cat.spent / cat.limit) * 100));
                            const over = cat.spent > cat.limit;
                            return (
                                <motion.div key={cat.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="bg-white p-4 rounded-2xl shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-full" style={{ background: cat.color }} />
                                            <div className="font-semibold">{cat.name}</div>
                                        </div>
                                        {over && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">OVER BUDGET</span>}
                                    </div>

                                    <div className="mt-4">
                                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                            <div style={{ width: `${percent}%`, height: '100%' }} className="rounded-full" />
                                        </div>

                                        <div className="flex justify-between text-sm mt-2 text-gray-600">
                                            <div>₹{cat.spent} spent</div>
                                            <div>Limit ₹{cat.limit}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Quick stats card */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-4 rounded-2xl shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-gray-500">Total Spent</div>
                                    <div className="text-xl font-bold">₹{categoryData.reduce((s, c) => s + c.spent, 0)}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-500">Budget Left</div>
                                    <div className="font-semibold">₹{categoryData.reduce((s, c) => s + (c.limit - c.spent), 0)}</div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Add Expense Modal (simple) */}
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

            </div>
            {categoryModalOpen && (
                <CategoryModal onClose={() => setCategoryModalOpen(false)} />
            )}
        </div>
    );
}
