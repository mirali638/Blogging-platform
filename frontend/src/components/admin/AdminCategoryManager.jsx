import React, { useState } from "react";

const mockCategories = [
  { id: 1, name: "Technology", postCount: 42 },
  { id: 2, name: "Travel", postCount: 18 },
  { id: 3, name: "Food & Cooking", postCount: 25 },
  { id: 4, name: "Lifestyle", postCount: 30 },
];

const AdminCategoryManager = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;
    const newCategory = {
      id: Date.now(),
      name: newCategoryName,
      postCount: 0,
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || editingCategory.name.trim() === "") return;
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id ? editingCategory : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="New category name"
          className="p-2 border rounded flex-grow"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory} className="px-4 py-2 bg-indigo-600 text-white rounded">
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Category Name</th>
              <th className="py-2 px-4 border-b text-left">Post Count</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="py-2 px-4 border-b">
                  {editingCategory && editingCategory.id === cat.id ? (
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    cat.name
                  )}
                </td>
                <td className="py-2 px-4 border-b">{cat.postCount}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  {editingCategory && editingCategory.id === cat.id ? (
                    <button onClick={handleUpdateCategory} className="text-green-600 hover:text-green-800">Save</button>
                  ) : (
                    <button onClick={() => setEditingCategory(cat)} className="text-blue-600 hover:text-blue-800">Edit</button>
                  )}
                  <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoryManager; 