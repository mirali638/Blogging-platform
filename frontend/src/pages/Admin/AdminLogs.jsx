import React from 'react';
import { FiActivity, FiFilter } from 'react-icons/fi';

const mockLogs = [
  { id: 1, timestamp: '2023-10-27 10:00:00', user: 'admin', action: 'User "test1" logged in.' },
  { id: 2, timestamp: '2023-10-27 10:05:12', user: 'admin', action: 'Blocked user "test3".' },
  { id: 3, timestamp: '2023-10-27 10:10:25', user: 'santhosh', action: 'Created new blog post "pid.csv".' },
  { id: 4, timestamp: '2023-10-27 10:15:45', user: 'admin', action: 'Deleted category "Uncategorized".' },
  { id: 5, timestamp: '2023-10-27 10:20:03', user: 'test2', action: 'Updated profile.' },
];

const AdminLogs = () => {
  return (
    <div>
      <div className="flex items-center mb-8">
        <FiActivity className="text-3xl text-red-500 mr-4" />
        <h1 className="text-3xl font-bold text-gray-800">Activity Logs</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">System Events</h2>
          <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
            <FiFilter className="mr-2" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 font-semibold text-gray-600">Timestamp</th>
                <th className="py-3 px-4 font-semibold text-gray-600">User</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-600">{log.timestamp}</td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{log.user}</td>
                  <td className="py-3 px-4 text-gray-600">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLogs; 