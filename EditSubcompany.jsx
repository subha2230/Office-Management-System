import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import "./AddSubcompany.css";


const EditSubcompany = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [companyLoading, setCompanyLoading] = useState(true);

    const [formData, setFormData] = useState({
        subcompanyName: "",
        subcompanyCode: "",
        description: "",
        companyId: "",
        isActive: true
    });


    // =========================
    // FETCH COMPANIES
    // =========================

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


    // =========================
    // FETCH SUBCOMPANY
    // =========================

    const fetchSubcompany = async () => {

        try {

            setLoading(true);

            const response =
                await api.get(`/subcompanies/${id}`);

            const subcompany =
                response.data;


            setFormData({

                subcompanyName:
                    subcompany.subcompanyName || "",

                subcompanyCode:
                    subcompany.subcompanyCode || "",

                description:
                    subcompany.description || "",

                companyId:
                    subcompany.company?.id
                        ? String(subcompany.company.id)
                        : "",

                isActive:
                    subcompany.isActive ?? true
            });


        } catch (error) {

            console.error(
                "Subcompany API Error:",
                error
            );


            if (
                error.response?.status === 404
            ) {

                alert(
                    "Subcompany not found."
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
                    "Failed to load subcompany."
                );
            }


            navigate("/subcompanies");

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // LOAD DATA
    // =========================

    useEffect(() => {

        fetchCompanies();
        fetchSubcompany();

    }, [id]);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;


        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });
    };


    // =========================
    // UPDATE SUBCOMPANY
    // =========================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!formData.companyId) {

            alert(
                "Please select a company."
            );

            return;
        }


        try {

            setSaving(true);


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


            await api.put(

                `/subcompanies/${id}?companyId=${formData.companyId}`,

                subcompanyData

            );


            alert(
                "Subcompany updated successfully."
            );


            navigate("/subcompanies");


        } catch (error) {

            console.error(
                "Update Subcompany Error:",
                error
            );


            if (
                error.response?.status === 403
            ) {

                alert(
                    "Only ADMIN can update subcompany."
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

                    "Failed to update subcompany."

                );
            }

        } finally {

            setSaving(false);
        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="add-subcompany-page">

                <div className="subcompany-loading">

                    Loading subcompany...

                </div>

            </div>
        );
    }


    // =========================
    // PAGE
    // =========================

    return (

        <div className="add-subcompany-page">


            {/* HEADER */}

            <div className="add-subcompany-header">

                <div>

                    <h1>
                        Edit Subcompany
                    </h1>

                    <p>
                        Update subcompany information.
                    </p>

                </div>

            </div>


            {/* FORM CARD */}

            <div className="add-subcompany-card">

                <form
                    onSubmit={handleSubmit}
                >


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
                                disabled={companyLoading}
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
                            disabled={saving}
                        >

                            {saving
                                ? "Updating..."
                                : "Update Subcompany"}

                        </button>


                    </div>

                </form>

            </div>

        </div>
    );
};


export default EditSubcompany;