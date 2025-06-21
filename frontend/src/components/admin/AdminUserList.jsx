import React, { useState } from "react";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", joined: "2024-05-20", status: "active", role: "user" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", joined: "2024-05-22", status: "active", role: "user" },
  { id: 3, name: "Spam Bot", email: "spam@bot.com", joined: "2024-06-01", status: "banned", role: "user" },
  { id: 4, name: "Admin User", email: "admin@example.com", joined: "2024-05-18", status: "active", role: "admin" },
];

const AdminUserList = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAction = (userId, action) => {
    alert(`User ${userId} - Action: ${action}`);
    // In a real app, you would dispatch an API call here.
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <input
        type="text"
        placeholder="Search by name or email..."
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Joined</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.joined}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button onClick={() => handleAction(user.id, 'Ban/Unban')} className="text-yellow-600 hover:text-yellow-800">Ban</button>
                  <button onClick={() => handleAction(user.id, 'Promote')} className="text-blue-600 hover:text-blue-800">Promote</button>
                  <button onClick={() => handleAction(user.id, 'Delete')} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList; 