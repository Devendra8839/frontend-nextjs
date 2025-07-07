'use client';

import React from 'react';

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: {
  employees: any[];
  onEdit: (employee: any) => void;
  onDelete: (id: number) => void;
}) {
  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <table className="w-full border rounded shadow-sm">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Phone</th>
          <th className="p-2">Role</th>
          <th className="p-2">Department ID</th>
          <th className="p-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{emp.name}</td>
            <td className="p-2">{emp.email}</td>
            <td className="p-2">{emp.phone || '-'}</td>
            <td className="p-2">{emp.role}</td>
            <td className="p-2">{emp.departmentId || '-'}</td>
            <td className="p-2 text-right space-x-2">
              <button
                onClick={() => onEdit(emp)}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(emp.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
