import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function CategoryModal({ onClose, onAdd, onEdit, onDelete }) {
    const [open, setOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const categories = [
        { name: "Food", color: "#ff6b6b", spent: 4200, limit: 5000 },
        { name: "Travel", color: "#4dabf7", spent: 3000, limit: 2500 },
        { name: "Shopping", color: "#845ef7", spent: 1200, limit: 3000 },
        { name: "Bills", color: "#40c057", spent: 800, limit: 2000 },
    ];

    const [formData, setFormData] = useState({
        name: "",
        type: "expense",
        color: "#4dabf7",
        limit: "",
    });

    const openForm = () => {
        setFormData({
            name: "",
            type: "expense",
            color: "#4dabf7",
            limit: "",
        });
        setFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormOpen(false);
    };

    return (
        <>

            <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
                <Plus className="w-4 h-4" /> Manage Categories
            </button>
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-white hover:text-gray-700"
            >
                ✖
            </button>
            {/* BACKDROP */}
            {open && (
                <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)}></div>
            )}

            {/* MODAL */}
            <div
                className={`fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 transition-transform duration-300 
        ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Categories</h2>
                    <button
                        onClick={openForm}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Category
                    </button>
                </div>

                {/* Category Cards */}
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto h-[calc(100%-70px)]">

                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            className="p-4 bg-gray-50 rounded-xl shadow flex flex-col gap-3"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ background: cat.color }}
                                    ></div>
                                    <h3 className="font-semibold text-lg">{cat.name}</h3>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(cat)}
                                        className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200"
                                    >
                                        <Pencil className="w-4 h-4 text-blue-600" />
                                    </button>

                                    <button
                                        onClick={() => onDelete(cat._id)}
                                        className="p-2 bg-red-100 rounded-lg hover:bg-red-200"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 capitalize">
                                Type: <span className="font-semibold">{cat.type}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Limit: <span className="font-semibold">₹{cat.limit}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ADD CATEGORY FORM MODAL */}
            {formOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Category Name"
                                className="w-full p-2 border rounded"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />

                            <select
                                className="w-full p-2 border rounded"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>

                            <div>
                                <label className="text-sm">Color</label>
                                <input
                                    type="color"
                                    className="w-full h-10 p-1 border rounded"
                                    value={formData.color}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                />
                            </div>

                            <input
                                type="number"
                                placeholder="Limit (₹)"
                                className="w-full p-2 border rounded"
                                value={formData.limit}
                                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                                required
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-200 rounded-lg"
                                    onClick={() => setFormOpen(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                >
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
