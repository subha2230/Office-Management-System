import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./JobRoleList.css";

export default function JobRoleList() {

    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    const [roles, setRoles] = useState([]);

    const [form, setForm] = useState({
        roleCode: "",
        roleName: "",
        description: "",
        isActive: true
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    // =========================
    // LOAD JOB ROLES
    // =========================

    const loadRoles = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/job-roles");

            setRoles(response.data || []);

        } catch (error) {

            console.error("Job Role API Error:", error);

            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to load job roles"
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // PAGE LOAD
    // =========================

    useEffect(() => {

        loadRoles();

    }, []);


    // =========================
    // FORM INPUT CHANGE
    // =========================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));

    };


    // =========================
    // SAVE JOB ROLE
    // =========================

    const saveRole = async (event) => {

        event.preventDefault();

        if (!isAdmin) {
            return;
        }

        try {

            setSaving(true);
            setError("");

            await api.post("/job-roles", {
                roleCode: form.roleCode,
                roleName: form.roleName,
                description: form.description,
                isActive: form.isActive
            });

            // Clear form after successful save
            setForm({
                roleCode: "",
                roleName: "",
                description: "",
                isActive: true
            });

            // Reload table
            await loadRoles();

        } catch (error) {

            console.error("Save Job Role Error:", error);

            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Unable to save job role"
            );

        } finally {

            setSaving(false);

        }
    };


    return (

        <div className="job-role-layout">

            {/* HEADER */}

            <Header />


            <div className="job-role-body">

                {/* SIDEBAR */}

                <Sidebar />


                {/* MAIN CONTENT */}

                <main className="job-role-main">

                    {/* PAGE TITLE */}

                    <div className="job-role-title">

                        <div>

                            <h1>Job Role Master</h1>

                            <p>
                                Roles are used for Employee ↔ Role
                                many-to-many mapping.
                            </p>

                        </div>

                    </div>


                    {/* ERROR MESSAGE */}

                    {error && (

                        <div className="job-role-error">
                            {error}
                        </div>

                    )}


                    {/* ADMIN ONLY FORM */}

                    {isAdmin && (

                        <form
                            className="job-role-card"
                            onSubmit={saveRole}
                        >

                            <h2>Add Job Role</h2>


                            <div className="job-role-form-grid">

                                {/* ROLE CODE */}

                                <div className="job-role-field">

                                    <label>
                                        Role Code
                                    </label>

                                    <input
                                        type="text"
                                        name="roleCode"
                                        value={form.roleCode}
                                        onChange={handleChange}
                                        placeholder="Example: DEV"
                                        required
                                    />

                                </div>


                                {/* ROLE NAME */}

                                <div className="job-role-field">

                                    <label>
                                        Role Name
                                    </label>

                                    <input
                                        type="text"
                                        name="roleName"
                                        value={form.roleName}
                                        onChange={handleChange}
                                        placeholder="Example: Developer"
                                        required
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="job-role-field job-role-field-full">

                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Enter role description"
                                        rows="4"
                                    />

                                </div>


                                {/* ACTIVE STATUS */}

                                <div className="job-role-field">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        name="isActive"
                                        value={form.isActive}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                isActive:
                                                    event.target.value === "true"
                                            })
                                        }
                                    >

                                        <option value="true">
                                            Active
                                        </option>

                                        <option value="false">
                                            Inactive
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* FORM BUTTON */}

                            <div className="job-role-form-actions">

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="job-role-save-button"
                                >

                                    {saving
                                        ? "Saving..."
                                        : "Save Role"
                                    }

                                </button>

                            </div>

                        </form>

                    )}


                    {/* JOB ROLE TABLE */}

                    <div className="job-role-card">

                        <div className="job-role-table-header">

                            <div>

                                <h2>
                                    Job Roles
                                </h2>

                                <p>
                                    Manage and view available job roles.
                                </p>

                            </div>

                            <span className="job-role-count">
                                {roles.length} Roles
                            </span>

                        </div>


                        {/* LOADING */}

                        {loading ? (

                            <div className="job-role-loading">
                                Loading roles...
                            </div>

                        ) : (

                            <div className="job-role-table-wrapper">

                                <table className="job-role-table">

                                    <thead>

                                    <tr>

                                        <th>
                                            Code
                                        </th>

                                        <th>
                                            Role Name
                                        </th>

                                        <th>
                                            Description
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Employees
                                        </th>

                                    </tr>

                                    </thead>


                                    <tbody>

                                    {roles.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="job-role-empty"
                                            >
                                                No roles found.
                                            </td>

                                        </tr>

                                    ) : (

                                        roles.map((role) => (

                                            <tr
                                                key={role.id}
                                            >

                                                <td>
                                                    {role.roleCode}
                                                </td>

                                                <td>
                                                    {role.roleName}
                                                </td>

                                                <td>
                                                    {role.description || "-"}
                                                </td>

                                                <td>

                                                        <span
                                                            className={
                                                                role.isActive === false
                                                                    ? "job-role-badge job-role-inactive"
                                                                    : "job-role-badge job-role-active"
                                                            }
                                                        >

                                                            {role.isActive === false
                                                                ? "Inactive"
                                                                : "Active"
                                                            }

                                                        </span>

                                                </td>

                                                <td>
                                                    {role.employees?.length ?? 0}
                                                </td>

                                            </tr>

                                        ))

                                    )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}