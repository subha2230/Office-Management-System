import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./SubcompanyList.css";

const SubcompanyList = () => {

    const navigate = useNavigate();

    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    const [subcompanies, setSubcompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD SUBCOMPANIES
    // ==========================================

    const fetchSubcompanies = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get("/subcompanies");

            setSubcompanies(
                response.data || []
            );

        } catch (err) {

            console.error(
                "Subcompany API Error:",
                err
            );

            if (err.response?.status === 401) {

                setError(
                    "Please login again."
                );

            } else if (err.response?.status === 403) {

                setError(
                    "You do not have permission to view subcompanies."
                );

            } else {

                setError(
                    "Failed to load subcompanies."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // LOAD WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        fetchSubcompanies();

    }, []);


    // ==========================================
    // DELETE SUBCOMPANY
    // ADMIN ONLY
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this subcompany?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/subcompanies/${id}`
            );

            alert(
                "Subcompany deleted successfully."
            );

            fetchSubcompanies();

        } catch (err) {

            console.error(
                "Delete Subcompany Error:",
                err
            );

            if (err.response?.status === 403) {

                alert(
                    "Only ADMIN can delete subcompany."
                );

            } else if (err.response?.status === 401) {

                alert(
                    "Please login again."
                );

            } else {

                alert(
                    "Failed to delete subcompany."
                );
            }
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="dashboard-layout">

                <Header />

                <div className="dashboard-body">

                    <Sidebar />

                    <main className="dashboard-main">

                        <div className="subcompany-loading">
                            Loading subcompanies...
                        </div>

                    </main>

                </div>

            </div>
        );
    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="dashboard-layout">

            {/* ==================================
                HEADER
            ================================== */}

            <Header />


            <div className="dashboard-body">

                {/* ==================================
                    SIDEBAR
                ================================== */}

                <Sidebar />


                {/* ==================================
                    MAIN CONTENT
                ================================== */}

                <main className="dashboard-main">

                    <div className="subcompany-content">


                        {/* ==================================
                            HIERARCHY
                        ================================== */}

                        <div className="subcompany-hierarchy">

                            <button
                                className="subcompany-hierarchy-item"
                                onClick={() =>
                                    navigate("/locations")
                                }
                            >
                                Location
                            </button>


                            <span className="subcompany-hierarchy-arrow">
                                →
                            </span>


                            <button
                                className="subcompany-hierarchy-item"
                                onClick={() =>
                                    navigate("/buildings")
                                }
                            >
                                Building
                            </button>


                            <span className="subcompany-hierarchy-arrow">
                                →
                            </span>


                            <button
                                className="subcompany-hierarchy-item"
                                onClick={() =>
                                    navigate("/companies")
                                }
                            >
                                Company
                            </button>


                            <span className="subcompany-hierarchy-arrow">
                                →
                            </span>


                            <button
                                className="subcompany-hierarchy-item active"
                            >
                                Subcompany
                            </button>

                        </div>


                        {/* ==================================
                            PAGE HEADER
                        ================================== */}

                        <div className="subcompany-page-header">

                            <div>

                                <h1>
                                    Subcompany Master
                                </h1>

                                <p>
                                    One Company can have many Subcompanies.
                                </p>

                            </div>


                            {/* ==================================
                                ADMIN ADD BUTTON
                            ================================== */}

                            {isAdmin && (

                                <button
                                    className="add-subcompany-btn"
                                    onClick={() =>
                                        navigate(
                                            "/subcompanies/add"
                                        )
                                    }
                                >
                                    + New Subcompany
                                </button>

                            )}

                        </div>


                        {/* ==================================
                            ERROR
                        ================================== */}

                        {error && (

                            <div className="subcompany-error">

                                {error}

                            </div>

                        )}


                        {/* ==================================
                            SUBCOMPANY CARD
                        ================================== */}

                        <div className="subcompany-card">


                            {/* ==================================
                                CARD HEADER
                            ================================== */}

                            <div className="subcompany-card-top">

                                <div>

                                    <h2>
                                        Subcompanies
                                    </h2>

                                    <p>
                                        Manage company sub-units
                                    </p>

                                </div>


                                <span className="subcompany-total">

                                    Total: {subcompanies.length}

                                </span>

                            </div>


                            {/* ==================================
                                TABLE
                            ================================== */}

                            <div className="subcompany-table-wrapper">

                                <table className="subcompany-table">

                                    <thead>

                                    <tr>

                                        <th>
                                            CODE
                                        </th>

                                        <th>
                                            SUBCOMPANY NAME
                                        </th>

                                        <th>
                                            DESCRIPTION
                                        </th>

                                        <th>
                                            COMPANY
                                        </th>

                                        <th>
                                            STATUS
                                        </th>

                                        {isAdmin && (

                                            <th>
                                                ACTION
                                            </th>

                                        )}

                                    </tr>

                                    </thead>


                                    <tbody>

                                    {/* ==================================
                                        NO DATA
                                    ================================== */}

                                    {subcompanies.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan={
                                                    isAdmin
                                                        ? 6
                                                        : 5
                                                }
                                                className="no-subcompany"
                                            >

                                                No subcompanies found.

                                            </td>

                                        </tr>

                                    ) : (

                                        /* ==================================
                                            SUBCOMPANY DATA
                                        ================================== */

                                        subcompanies.map(
                                            (subcompany) => (

                                                <tr
                                                    key={
                                                        subcompany.id
                                                    }
                                                >

                                                    {/* CODE */}

                                                    <td>

                                                        {
                                                            subcompany.subcompanyCode
                                                        }

                                                    </td>


                                                    {/* NAME */}

                                                    <td className="subcompany-name">

                                                        {
                                                            subcompany.subcompanyName
                                                        }

                                                    </td>


                                                    {/* DESCRIPTION */}

                                                    <td>

                                                        {
                                                            subcompany.description
                                                            || "-"
                                                        }

                                                    </td>


                                                    {/* COMPANY */}

                                                    <td>

                                                        {
                                                            subcompany.company
                                                                ? subcompany.company.companyName
                                                                : "-"
                                                        }

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        {subcompany.isActive ? (

                                                            <span className="active-status">

                                                                Active

                                                            </span>

                                                        ) : (

                                                            <span className="inactive-status">

                                                                Inactive

                                                            </span>

                                                        )}

                                                    </td>


                                                    {/* ==================================
                                                        ADMIN ACTIONS
                                                    ================================== */}

                                                    {isAdmin && (

                                                        <td>

                                                            <div className="subcompany-actions">


                                                                {/* EDIT */}

                                                                <button
                                                                    className="edit-subcompany-btn"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/subcompanies/edit/${subcompany.id}`
                                                                        )
                                                                    }
                                                                >

                                                                    Edit

                                                                </button>


                                                                {/* DELETE */}

                                                                <button
                                                                    className="delete-subcompany-btn"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            subcompany.id
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

export default SubcompanyList;