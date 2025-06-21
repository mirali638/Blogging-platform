import React from "react";

const AdminLogs = () => {
  const logs = [
    { id: 1, message: "User admin logged in", date: "2024-06-01" },
    { id: 2, message: "Blog created by user1", date: "2024-06-02" },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id} className="mb-1">
            {log.message} ({log.date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLogs; 