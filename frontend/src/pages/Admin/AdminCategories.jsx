import React from 'react';
import { FiGrid, FiEdit, FiTrash2 } from 'react-icons/fi';

const mockCategories = [
  { id: 1, name: 'Technology', description: 'Articles about modern tech.' },
  { id: 2, name: 'Health', description: 'Posts on wellness and fitness.' },
  { id: 3, name: 'Finance', description: 'All about money management.' },
  { id: 4, name: 'Travel', description: 'Stories from around the world.' },
  { id: 5, name: 'Food', description: 'Recipes and culinary adventures.' },
];

const AdminCategories = () => {
  return (
    <div>
      <div className="flex items-center mb-8">
        <FiGrid className="text-3xl text-purple-500 mr-4" />
        <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
      </div>

      <div className="mb-8">
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
          Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-xl font-bold">{category.name}</h3>
      <p className="text-gray-500 mt-1">{category.description}</p>

      <div className="mt-4 flex space-x-2">
        <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <FiEdit className="mr-2" /> Edit
        </button>
        <button className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          <FiTrash2 className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default AdminCategories; 