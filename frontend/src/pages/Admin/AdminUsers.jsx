import React, { useState, useEffect } from 'react';
import { FiUsers, FiMoreVertical, FiCircle, FiRefreshCw } from 'react-icons/fi';
import api from '../../utils/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUsers();
    
    // Auto-refresh every 30 seconds to keep online status updated
    const interval = setInterval(() => {
      if (!loading) {
        fetchUsers(true); // Silent refresh
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      if (silent) setRefreshing(true);
      
      const response = await api.get('/userdashboard/users/all');
      setUsers(response.data);
      setError(''); // Clear any previous errors
    } catch (err) {
      if (!silent) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const toggleBlock = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'banned' : 'active';
      console.log('Toggling user status:', { userId, currentStatus, newStatus });
      
      const response = await api.put(`/userdashboard/users/${userId}/status`, { status: newStatus });
      console.log('Status update response:', response.data);
      
      setUsers(users.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ));
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error updating user status:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update user status';
      setError(errorMessage);
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      console.log('Updating role for user:', userId, 'to role:', newRole);
      
      const response = await api.put(`/userdashboard/users/${userId}/role`, { role: newRole });
      console.log('Role update response:', response.data);
      
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error updating user role:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update user role';
      setError(errorMessage);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      console.log('Deleting user:', userId);
      
      const response = await api.delete(`/userdashboard/users/${userId}`);
      console.log('Delete response:', response.data);
      
      setUsers(users.filter(user => user._id !== userId));
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error deleting user:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete user';
      setError(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
        <FiUsers className="text-3xl text-gray-700 mr-4" />
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        </div>
        <button
          onClick={() => fetchUsers()}
          disabled={refreshing}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiRefreshCw className={`${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiCircle className="text-green-500" />
            <span>Online ({users.filter(u => u.isOnline).length})</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCircle className="text-gray-400" />
            <span>Offline ({users.filter(u => !u.isOnline).length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Total: {users.length} users</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Active: {users.filter(u => u.status === 'active').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Banned: {users.filter(u => u.status === 'banned').length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard 
            key={user._id} 
            user={user} 
            onToggleBlock={toggleBlock}
            onUpdateRole={updateRole}
            onDelete={deleteUser}
          />
        ))}
      </div>
    </div>
  );
};

const UserCard = ({ user, onToggleBlock, onUpdateRole, onDelete }) => {
  const isBlocked = user.status === 'banned';
  const isOnline = user.isOnline;
  
    return (
      <div className={`bg-white rounded-lg shadow-md p-5 ${isBlocked ? 'bg-red-50' : ''}`}>
        <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{user.username}</h3>
            <div className="flex items-center gap-1">
              <FiCircle className={`text-xs ${isOnline ? 'text-green-500' : 'text-gray-400'}`} />
              <span className={`text-xs ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
          {user.lastLogin && (
            <p className="text-sm text-gray-400">
              Last login: {new Date(user.lastLogin).toLocaleString()}
            </p>
          )}
          {user.lastActivity && (
            <p className="text-sm text-gray-400">
              Last activity: {new Date(user.lastActivity).toLocaleString()}
            </p>
          )}
        </div>
          <FiMoreVertical className="text-gray-400 cursor-pointer" />
        </div>
        
        <div className="mt-4">
          <p>Status: 
            <span className={`font-semibold ${isBlocked ? 'text-red-500' : 'text-green-500'}`}>
              {` ${user.status}`}
            </span>
          </p>
        <p className="text-sm text-gray-600">Role: {user.role}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
        <select 
          className="border rounded px-2 py-1 text-sm"
          value={user.role}
          onChange={(e) => onUpdateRole(user._id, e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
            </select>

            <div className="flex space-x-2">
                <button 
            onClick={() => onToggleBlock(user._id, user.status)}
            className={`${
              isBlocked 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white px-3 py-1 rounded text-sm`}
          >
                    {isBlocked ? 'Unblock' : 'Block'}
                </button>
          <button 
            onClick={() => onDelete(user._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
            </div>
        </div>
      </div>
    );
  };

export default AdminUsers; 
