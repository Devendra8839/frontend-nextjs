'use client';

import { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // null = Add

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:3001/employees', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to load employees', error);
    } finally {
      setLoading(false);
    }
  };

  // On component load
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Open modal to add or edit
  const openModal = (employee = null) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (formData: any) => {
    const isEditing = !!editingEmployee;
    const url = isEditing
      ? `http://localhost:3001/employees/${editingEmployee.id}`
      : `http://localhost:3001/employees`;

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchEmployees(); // refresh table
        setModalOpen(false);
      } else {
        console.error('Save failed');
      }
    } catch (error) {
      console.error('Error saving employee', error);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Delete this employee?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3001/employees/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) fetchEmployees();
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <EmployeeTable
          employees={employees}
          onEdit={openModal}
          onDelete={handleDelete}
        />
      )}

      {modalOpen && (
        <EmployeeForm
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          employee={editingEmployee}
        />
      )}
    </main>
  );
}
