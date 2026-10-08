import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Reports.css";

export default function Reports() {
    const [summary, setSummary] = useState({
        locations: 0,
        buildings: 0,
        employees: 0,
        jobRoles: 0
    });

    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            setLoading(true);
            setError("");

            const [
                summaryResponse,
                locationResponse,
                roleResponse,
                employeeResponse
            ] = await Promise.all([
                api.get("/reports/summary"),
                api.get("/reports/location-wise"),
                api.get("/reports/role-wise"),
                api.get("/reports/employee-directory")
            ]);

            setSummary(summaryResponse.data || {
                locations: 0,
                buildings: 0,
                employees: 0,
                jobRoles: 0
            });

            setLocations(locationResponse.data || []);
            setRoles(roleResponse.data || []);
            setEmployees(employeeResponse.data || []);

        } catch (error) {
            console.error("Reports API Error:", error);

            setError(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to load reports"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reports-layout">

            <Header />

            <div className="reports-body">

                <Sidebar />

                <main className="reports-main">

                    {/* PAGE HEADER */}
                    <div className="reports-header">
                        <div>
                            <h1>Reports</h1>

                            <p>
                                Reports generated from the master hierarchy.
                            </p>
                        </div>

                        <button
                            className="reports-refresh-button"
                            onClick={loadReports}
                        >
                            Refresh
                        </button>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="reports-error">
                            {error}
                        </div>
                    )}

                    {/* LOADING */}
                    {loading ? (

                        <div className="reports-loading">
                            Loading reports...
                        </div>

                    ) : (

                        <>

                            {/* SUMMARY CARDS */}
                            <div className="reports-stats">

                                <div className="reports-stat-card">
                                    <span>Total Locations</span>
                                    <strong>
                                        {summary.locations ?? 0}
                                    </strong>
                                </div>

                                <div className="reports-stat-card">
                                    <span>Total Buildings</span>
                                    <strong>
                                        {summary.buildings ?? 0}
                                    </strong>
                                </div>

                                <div className="reports-stat-card">
                                    <span>Total Employees</span>
                                    <strong>
                                        {summary.employees ?? 0}
                                    </strong>
                                </div>

                                <div className="reports-stat-card">
                                    <span>Total Job Roles</span>
                                    <strong>
                                        {summary.jobRoles ?? 0}
                                    </strong>
                                </div>

                            </div>


                            {/* LOCATION + ROLE REPORT */}
                            <div className="reports-grid">

                                {/* LOCATION REPORT */}
                                <div className="reports-card">

                                    <div className="reports-card-header">
                                        <h2>Location-wise Report</h2>

                                        <span>
                                            {locations.length} Locations
                                        </span>
                                    </div>

                                    <div className="reports-table-wrapper">

                                        <table className="reports-table">

                                            <thead>
                                            <tr>
                                                <th>Location</th>
                                                <th>Code</th>
                                                <th>Buildings</th>
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {locations.length === 0 ? (

                                                <tr>
                                                    <td
                                                        colSpan="3"
                                                        className="reports-empty"
                                                    >
                                                        No location data found
                                                    </td>
                                                </tr>

                                            ) : (

                                                locations.map((location) => (

                                                    <tr
                                                        key={location.locationId}
                                                    >

                                                        <td>
                                                            {location.locationName}
                                                        </td>

                                                        <td>
                                                            {location.locationCode}
                                                        </td>

                                                        <td>
                                                            {location.buildingCount ?? 0}
                                                        </td>

                                                    </tr>

                                                ))

                                            )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>


                                {/* ROLE REPORT */}
                                <div className="reports-card">

                                    <div className="reports-card-header">
                                        <h2>Role-wise Report</h2>

                                        <span>
                                            {roles.length} Roles
                                        </span>
                                    </div>

                                    <div className="reports-table-wrapper">

                                        <table className="reports-table">

                                            <thead>
                                            <tr>
                                                <th>Role</th>
                                                <th>Code</th>
                                                <th>Employees</th>
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {roles.length === 0 ? (

                                                <tr>
                                                    <td
                                                        colSpan="3"
                                                        className="reports-empty"
                                                    >
                                                        No role data found
                                                    </td>
                                                </tr>

                                            ) : (

                                                roles.map((role) => (

                                                    <tr
                                                        key={role.roleCode}
                                                    >

                                                        <td>
                                                            {role.roleName}
                                                        </td>

                                                        <td>
                                                            {role.roleCode}
                                                        </td>

                                                        <td>
                                                            {role.employeeCount ?? 0}
                                                        </td>

                                                    </tr>

                                                ))

                                            )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>


                            {/* EMPLOYEE DIRECTORY */}
                            <div className="reports-card reports-employee-card">

                                <div className="reports-card-header">

                                    <div>
                                        <h2>Employee Directory</h2>

                                        <p>
                                            Employee information from the hierarchy.
                                        </p>
                                    </div>

                                    <span>
                                        {employees.length} Employees
                                    </span>

                                </div>


                                <div className="reports-table-wrapper">

                                    <table className="reports-table">

                                        <thead>

                                        <tr>
                                            <th>Employee ID</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Department</th>
                                            <th>Roles</th>
                                        </tr>

                                        </thead>


                                        <tbody>

                                        {employees.length === 0 ? (

                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="reports-empty"
                                                >
                                                    No employee data found
                                                </td>
                                            </tr>

                                        ) : (

                                            employees.map((employee) => (

                                                <tr
                                                    key={employee.employeeId}
                                                >

                                                    <td>
                                                        {employee.employeeId}
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
                                                        {employee.roles?.length
                                                            ? employee.roles.join(", ")
                                                            : "-"
                                                        }
                                                    </td>

                                                </tr>

                                            ))

                                        )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </>

                    )}

                </main>

            </div>

        </div>
    );
}