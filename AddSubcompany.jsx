import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddSubcompany = () => {

    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(false);
    const [companyLoading, setCompanyLoading] = useState(true);

    const [formData, setFormData] = useState({
        subcompanyName: "",
        subcompanyCode: "",
        description: "",
        companyId: "",
        isActive: true
    });


    // ==========================================
    // FETCH COMPANIES
    // ==========================================

    const fetchCompanies = async () => {

        try {

            setCompanyLoading(true);

            const response =
                await api.get("/companies");

            setCompanies(
                response.data || []
            );

        } catch (error) {

            console.error(
                "Company API Error:",
                error
            );

            alert(
                error.response?.data?.error ||
                "Failed to load companies."
            );

        } finally {

            setCompanyLoading(false);
        }
    };


    // ==========================================
    // LOAD COMPANIES
    // ==========================================

    useEffect(() => {

        fetchCompanies();

    }, []);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        // Validate Company

        if (!formData.companyId) {

            alert(
                "Please select a company."
            );

            return;
        }


        try {

            setLoading(true);


            const subcompanyData = {

                subcompanyName:
                formData.subcompanyName,

                subcompanyCode:
                formData.subcompanyCode,

                description:
                formData.description,

                isActive:
                formData.isActive
            };


            // ==================================
            // SEND COMPANY ID
            // ==================================

            await api.post(
                `/subcompanies?companyId=${formData.companyId}`,
                subcompanyData
            );


            alert(
                "Subcompany created successfully."
            );


            navigate(
                "/subcompanies"
            );


        } catch (error) {

            console.error(
                "Create Subcompany Error:",
                error
            );


            if (
                error.response?.status === 403
            ) {

                alert(
                    "Only ADMIN can create subcompany."
                );

            } else if (
                error.response?.status === 401
            ) {

                alert(
                    "Please login again."
                );

            } else {

                alert(
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    "Failed to create subcompany."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="add-subcompany-page">


            {/* ================= HEADER ================= */}

            <div className="add-subcompany-header">

                <div>

                    <h1>
                        Add Subcompany
                    </h1>

                    <p>
                        Create a new subcompany.
                    </p>

                </div>

            </div>


            {/* ================= CARD ================= */}

            <div className="add-subcompany-card">

                <form onSubmit={handleSubmit}>


                    <div className="form-grid">


                        {/* SUBCOMPANY NAME */}

                        <div className="form-group">

                            <label>
                                Subcompany Name *
                            </label>

                            <input
                                type="text"
                                name="subcompanyName"
                                value={
                                    formData.subcompanyName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter subcompany name"
                                required
                            />

                        </div>


                        {/* SUBCOMPANY CODE */}

                        <div className="form-group">

                            <label>
                                Subcompany Code *
                            </label>

                            <input
                                type="text"
                                name="subcompanyCode"
                                value={
                                    formData.subcompanyCode
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter subcompany code"
                                required
                            />

                        </div>


                        {/* COMPANY */}

                        <div className="form-group">

                            <label>
                                Company *
                            </label>

                            <select
                                name="companyId"
                                value={
                                    formData.companyId
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                disabled={
                                    companyLoading
                                }
                            >

                                <option value="">

                                    {companyLoading
                                        ? "Loading companies..."
                                        : "Select Company"}

                                </option>


                                {companies.map(
                                    (company) => (

                                        <option
                                            key={
                                                company.id
                                            }
                                            value={
                                                company.id
                                            }
                                        >

                                            {
                                                company.companyCode
                                            }

                                            {" - "}

                                            {
                                                company.companyName
                                            }

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* DESCRIPTION */}

                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <input
                                type="text"
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter description"
                            />

                        </div>


                    </div>


                    {/* ACTIVE */}

                    <div className="active-section">

                        <input
                            type="checkbox"
                            id="active"
                            name="isActive"
                            checked={
                                formData.isActive
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <label htmlFor="active">
                            Active Subcompany
                        </label>

                    </div>


                    {/* BUTTONS */}

                    <div className="add-subcompany-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate(
                                    "/subcompanies"
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-subcompany-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : "Save Subcompany"}

                        </button>

                    </div>


                </form>

            </div>

        </div>
    );
};

export default AddSubcompany;