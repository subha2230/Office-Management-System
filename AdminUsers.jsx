import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./AdminDashboard.css";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const fetchUsers = async () => {
        try {
            setError("");
            const response = await api.get("/admin/users");
            setUsers(response.data || []);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, role) => {
        try {
            setUpdatingId(userId);
            setError("");

            const response = await api.put(`/admin/users/${userId}/role`, { role });

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === userId ? response.data : user
                )
            );
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update user role");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="dashboard-layout">
            <Header />
            <div className="dashboard-body">
                <Sidebar />
                <main className="dashboard-main">
                    <div className="page-title">
                        <h1>User Management</h1>
                        <p>Admin can change user access between USER and ADMIN.</p>
                    </div>

                    <div className="dashboard-card">
                        {error && <div className="error-message">{error}</div>}

                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role / Access</th>
                                </tr>
                                </thead>
                                <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={4} className="table-empty">Loading users...</td>
                                    </tr>
                                )}

                                {!loading && users.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="table-empty">No users found.</td>
                                    </tr>
                                )}

                                {!loading && users.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.username}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <select
                                                className="role-select"
                                                value={u.role}
                                                disabled={updatingId === u.id}
                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            >
                                                <option value="USER">USER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminUsers;
