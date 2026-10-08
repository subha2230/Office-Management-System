import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./EmployeeList.css";

const emptyForm = {
    employeeCode: "",
    fullName: "",
    email: "",
    department: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
    roleIds: []
};

export default function EmployeeList() {

    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);

    const [form, setForm] = useState(emptyForm);

    const [editing, setEditing] = useState(null);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [saving, setSaving] = useState(false);


    // ==========================================
    // LOAD EMPLOYEES AND JOB ROLES
    // ==========================================

    const loadEmployees = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                employeeResponse,
                roleResponse
            ] = await Promise.all([
                api.get("/employees"),
                api.get("/job-roles")
            ]);

            setEmployees(employeeResponse.data || []);

            setRoles(roleResponse.data || []);

        } catch (error) {

            console.error("Employee API Error:", error);

            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to load employees"
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // PAGE LOAD
    // ==========================================

    useEffect(() => {

        loadEmployees();

    }, []);


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredEmployees = useMemo(() => {

        const searchText = search.toLowerCase();

        return employees.filter((employee) => {

            return `${employee.employeeCode}
                    ${employee.fullName}
                    ${employee.email}
                    ${employee.department}`
                .toLowerCase()
                .includes(searchText);

        });

    }, [employees, search]);


    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));

    };


    // ==========================================
    // JOB ROLE MULTI SELECT
    // ==========================================

    const handleRoleChange = (event) => {

        const selectedRoleIds = Array
            .from(event.target.selectedOptions)
            .map((option) => Number(option.value));

        setForm((previousForm) => ({
            ...previousForm,
            roleIds: selectedRoleIds
        }));

    };


    // ==========================================
    // SAVE / UPDATE EMPLOYEE
    // ==========================================

    const saveEmployee = async (event) => {

        event.preventDefault();

        if (!isAdmin) {
            return;
        }

        try {

            setSaving(true);
            setError("");

            const body = {
                employeeCode: form.employeeCode,
                fullName: form.fullName,
                email: form.email,
                department: form.department,

                profile: {
                    phoneNumber: form.phoneNumber,
                    address: form.address,
                    emergencyContact: form.emergencyContact
                }
            };


            const config = {
                params: {}
            };


            if (form.roleIds.length > 0) {

                config.params.roleIds = form.roleIds;

            }


            // UPDATE
            if (editing) {

                await api.put(
                    `/employees/${editing}`,
                    body,
                    config
                );

            }

            // CREATE
            else {

                await api.post(
                    "/employees",
                    body,
                    config
                );

            }


            // CLEAR FORM

            setForm(emptyForm);

            setEditing(null);


            // RELOAD DATA

            await loadEmployees();

        } catch (error) {

            console.error("Save Employee Error:", error);

            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Unable to save employee"
            );

        } finally {

            setSaving(false);

        }
    };


    // ==========================================
    // EDIT EMPLOYEE
    // ==========================================

    const editEmployee = (employee) => {

        setEditing(employee.id);

        setForm({
            employeeCode: employee.employeeCode || "",
            fullName: employee.fullName || "",
            email: employee.email || "",
            department: employee.department || "",

            phoneNumber:
                employee.profile?.phoneNumber || "",

            address:
                employee.profile?.address || "",

            emergencyContact:
                employee.profile?.emergencyContact || "",

            roleIds:
                employee.jobRoles?.map(
                    (role) => role.id
                ) || []
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==========================================
    // CLEAR FORM
    // ==========================================

    const clearForm = () => {

        setForm(emptyForm);

        setEditing(null);

        setError("");

    };


    // ==========================================
    // DELETE EMPLOYEE
    // ==========================================

    const removeEmployee = async (id) => {

        const confirmed = window.confirm(
            "Delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await api.delete(
                `/employees/${id}`
            );

            await loadEmployees();

        } catch (error) {

            console.error(
                "Delete Employee Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Unable to delete employee"
            );

        }
    };


    return (

        <div className="employee-layout">

            {/* HEADER */}

            <Header />


            <div className="employee-body">

                {/* SIDEBAR */}

                <Sidebar />


                {/* MAIN */}

                <main className="employee-main">

                    {/* PAGE TITLE */}

                    <div className="employee-title">

                        <div>

                            <h1>
                                Employee Master
                            </h1>

                            <p>
                                Employees can be mapped to multiple job roles.
                            </p>

                        </div>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="employee-error">
                            {error}
                        </div>

                    )}


                    {/* ADMIN FORM */}

                    {isAdmin && (

                        <form
                            className="employee-card"
                            onSubmit={saveEmployee}
                        >

                            <div className="employee-form-header">

                                <div>

                                    <h2>
                                        {editing
                                            ? "Update Employee"
                                            : "Add Employee"
                                        }
                                    </h2>

                                    <p>
                                        Enter employee details and assign job roles.
                                    </p>

                                </div>

                            </div>


                            <div className="employee-form-grid">

                                {/* EMPLOYEE CODE */}

                                <div className="employee-field">

                                    <label>
                                        Employee Code
                                    </label>

                                    <input
                                        type="text"
                                        name="employeeCode"
                                        value={form.employeeCode}
                                        onChange={handleChange}
                                        placeholder="Example: EMP001"
                                        required
                                    />

                                </div>


                                {/* FULL NAME */}

                                <div className="employee-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        required
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="employee-field">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="employee@example.com"
                                    />

                                </div>


                                {/* DEPARTMENT */}

                                <div className="employee-field">

                                    <label>
                                        Department
                                    </label>

                                    <input
                                        type="text"
                                        name="department"
                                        value={form.department}
                                        onChange={handleChange}
                                        placeholder="Example: IT"
                                    />

                                </div>


                                {/* PHONE */}

                                <div className="employee-field">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />

                                </div>


                                {/* EMERGENCY CONTACT */}

                                <div className="employee-field">

                                    <label>
                                        Emergency Contact
                                    </label>

                                    <input
                                        type="text"
                                        name="emergencyContact"
                                        value={form.emergencyContact}
                                        onChange={handleChange}
                                        placeholder="Emergency contact"
                                    />

                                </div>


                                {/* ADDRESS */}

                                <div className="employee-field employee-field-full">

                                    <label>
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="Enter employee address"
                                        rows="3"
                                    />

                                </div>


                                {/* JOB ROLES */}

                                <div className="employee-field employee-field-full">

                                    <label>
                                        Job Roles
                                    </label>

                                    <select
                                        multiple
                                        value={form.roleIds.map(String)}
                                        onChange={handleRoleChange}
                                    >

                                        {roles.map((role) => (

                                            <option
                                                key={role.id}
                                                value={role.id}
                                            >
                                                {role.roleCode}
                                                {" - "}
                                                {role.roleName}
                                            </option>

                                        ))}

                                    </select>

                                    <small>
                                        Hold Ctrl and select multiple roles.
                                    </small>

                                </div>

                            </div>


                            {/* FORM BUTTONS */}

                            <div className="employee-form-actions">

                                <button
                                    type="button"
                                    className="employee-btn employee-btn-secondary"
                                    onClick={clearForm}
                                >
                                    Clear
                                </button>


                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="employee-btn employee-btn-primary"
                                >

                                    {saving
                                        ? "Saving..."
                                        : editing
                                            ? "Update Employee"
                                            : "Save Employee"
                                    }

                                </button>

                            </div>

                        </form>

                    )}


                    {/* EMPLOYEE LIST */}

                    <div className="employee-card">

                        {/* TOOLBAR */}

                        <div className="employee-toolbar">

                            <div>

                                <h2>
                                    Employee List
                                </h2>

                                <p>
                                    View and manage employee records.
                                </p>

                            </div>


                            <div className="employee-toolbar-right">

                                <input
                                    className="employee-search"
                                    type="text"
                                    placeholder="Search employee..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                />

                                <span className="employee-count">
                                    {filteredEmployees.length} Employees
                                </span>

                            </div>

                        </div>


                        {/* LOADING */}

                        {loading ? (

                            <div className="employee-loading">
                                Loading employees...
                            </div>

                        ) : (

                            <div className="employee-table-wrapper">

                                <table className="employee-table">

                                    <thead>

                                    <tr>

                                        <th>
                                            Employee ID
                                        </th>

                                        <th>
                                            Full Name
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Department
                                        </th>

                                        <th>
                                            Roles
                                        </th>

                                        {isAdmin && (

                                            <th>
                                                Actions
                                            </th>

                                        )}

                                    </tr>

                                    </thead>


                                    <tbody>

                                    {filteredEmployees.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan={
                                                    isAdmin ? 6 : 5
                                                }
                                                className="employee-empty"
                                            >
                                                No employees found.
                                            </td>

                                        </tr>

                                    ) : (

                                        filteredEmployees.map(
                                            (employee) => (

                                                <tr
                                                    key={employee.id}
                                                >

                                                    <td>
                                                        {employee.employeeCode}
                                                    </td>

                                                    <td>
                                                        {employee.fullName}
                                                    </td>

                                                    <td>
                                                        {employee.email || "-"}
                                                    </td>

                                                    <td>
                                                        {employee.department || "-"}
                                                    </td>

                                                    <td>

                                                        {employee.jobRoles?.length
                                                            ? employee.jobRoles
                                                                .map(
                                                                    (role) =>
                                                                        role.roleName
                                                                )
                                                                .join(", ")
                                                            : "-"
                                                        }

                                                    </td>


                                                    {isAdmin && (

                                                        <td>

                                                            <div className="employee-actions">

                                                                <button
                                                                    type="button"
                                                                    className="employee-btn employee-btn-edit"
                                                                    onClick={() =>
                                                                        editEmployee(
                                                                            employee
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="employee-btn employee-btn-danger"
                                                                    onClick={() =>
                                                                        removeEmployee(
                                                                            employee.id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>

                                                            </div>

                                                        </td>

                                                    )}

                                                </tr>

                                            )
                                        )

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