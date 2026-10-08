import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./CompanyList.css";

const CompanyList = () => {

    const navigate = useNavigate();

    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================
    // LOAD COMPANIES
    // =========================

    const fetchCompanies = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get("/companies");

            setCompanies(
                response.data || []
            );

        } catch (err) {

            console.error(
                "Company API Error:",
                err
            );

            if (err.response?.status === 401) {

                setError(
                    "Please login again."
                );

            } else if (err.response?.status === 403) {

                setError(
                    "You do not have permission to view companies."
                );

            } else {

                setError(
                    "Failed to load companies."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // LOAD ON PAGE OPEN
    // =========================

    useEffect(() => {

        fetchCompanies();

    }, []);


    // =========================
    // DELETE COMPANY
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this company?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/companies/${id}`
            );

            alert(
                "Company deleted successfully."
            );

            fetchCompanies();

        } catch (err) {

            console.error(
                "Delete Company Error:",
                err
            );

            if (
                err.response?.status === 403
            ) {

                alert(
                    "Only ADMIN can delete company."
                );

            } else if (
                err.response?.status === 401
            ) {

                alert(
                    "Please login again."
                );

            } else {

                alert(
                    "Failed to delete company."
                );
            }
        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="company-layout">

                <Header />

                <div className="company-body">

                    <Sidebar />

                    <main className="company-main">

                        <div className="company-loading">
                            Loading companies...
                        </div>

                    </main>

                </div>

            </div>
        );
    }


    // =========================
    // PAGE
    // =========================

    return (

        <div className="company-layout">

            {/* HEADER */}

            <Header />


            <div className="company-body">

                {/* SIDEBAR */}

                <Sidebar />


                {/* MAIN CONTENT */}

                <main className="company-main">

                    <div className="company-content">


                        {/* ================= HEADER ================= */}

                        <div className="company-page-header">

                            <div>

                                <h1>
                                    Company Management
                                </h1>

                                <p>
                                    View, add, edit and delete companies.
                                </p>

                            </div>


                            {isAdmin && (

                                <button
                                    className="add-company-btn"
                                    onClick={() =>
                                        navigate(
                                            "/companies/add"
                                        )
                                    }
                                >
                                    + Add Company
                                </button>

                            )}

                        </div>


                        {/* ================= ERROR ================= */}

                        {error && (

                            <div className="company-error">

                                {error}

                            </div>

                        )}


                        {/* ================= COMPANY CARD ================= */}

                        <div className="company-card">


                            {/* CARD HEADER */}

                            <div className="company-card-top">

                                <h2>
                                    Companies
                                </h2>

                                <span className="company-total">
                                    Total: {companies.length}
                                </span>

                            </div>


                            {/* TABLE */}

                            <div className="company-table-wrapper">

                                <table className="company-table">

                                    <thead>

                                    <tr>

                                        <th>CODE</th>

                                        <th>COMPANY NAME</th>

                                        <th>INDUSTRY</th>

                                        <th>LOCATION</th>

                                        <th>CONTACT PERSON</th>

                                        <th>PHONE</th>

                                        <th>EMAIL</th>

                                        <th>STATUS</th>

                                        {isAdmin && (
                                            <th>ACTION</th>
                                        )}

                                    </tr>

                                    </thead>


                                    <tbody>

                                    {companies.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan={
                                                    isAdmin
                                                        ? 9
                                                        : 8
                                                }
                                                className="no-company"
                                            >
                                                No companies found.
                                            </td>

                                        </tr>

                                    ) : (

                                        companies.map(
                                            (company) => (

                                                <tr
                                                    key={
                                                        company.id
                                                    }
                                                >

                                                    {/* CODE */}

                                                    <td>
                                                        {
                                                            company.companyCode
                                                        }
                                                    </td>


                                                    {/* COMPANY NAME */}

                                                    <td className="company-name">

                                                        {
                                                            company.companyName
                                                        }

                                                    </td>


                                                    {/* INDUSTRY */}

                                                    <td>

                                                        {
                                                            company.industry
                                                            || "-"
                                                        }

                                                    </td>


                                                    {/* LOCATION */}

                                                    <td>

                                                        {
                                                            company.location
                                                                ? company.location.locationName
                                                                : "-"
                                                        }

                                                    </td>


                                                    {/* CONTACT */}

                                                    <td>

                                                        {
                                                            company.contactPerson
                                                            || "-"
                                                        }

                                                    </td>


                                                    {/* PHONE */}

                                                    <td>

                                                        {
                                                            company.phone
                                                            || "-"
                                                        }

                                                    </td>


                                                    {/* EMAIL */}

                                                    <td>

                                                        {
                                                            company.email
                                                            || "-"
                                                        }

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        {company.isActive ? (

                                                            <span className="active-status">
                                                                Active
                                                            </span>

                                                        ) : (

                                                            <span className="inactive-status">
                                                                Inactive
                                                            </span>

                                                        )}

                                                    </td>


                                                    {/* ACTION */}

                                                    {isAdmin && (

                                                        <td>

                                                            <div className="company-actions">

                                                                <button
                                                                    className="edit-company-btn"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/companies/edit/${company.id}`
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>


                                                                <button
                                                                    className="delete-company-btn"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            company.id
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

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
};

export default CompanyList;