import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

import "./AddCompany.css";


const EditCompany = () => {

    const navigate = useNavigate();
    const { id } = useParams();


    // =========================================================
    // STATE
    // =========================================================

    const [locations, setLocations] = useState([]);
    const [buildings, setBuildings] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [buildingLoading, setBuildingLoading] = useState(false);


    // =========================================================
    // FORM DATA
    // =========================================================

    const [formData, setFormData] = useState({

        companyName: "",
        companyCode: "",
        industry: "",
        address: "",
        contactPerson: "",
        phone: "",
        email: "",

        locationId: "",
        buildingId: "",

        isActive: true
    });


    // =========================================================
    // FETCH LOCATIONS
    // =========================================================

    const fetchLocations = async () => {

        try {

            const response =
                await api.get(
                    "/locations?page=0&size=100"
                );

            const data = response.data;

            setLocations(
                data.content || data || []
            );

        } catch (error) {

            console.error(
                "Location API Error:",
                error
            );

            alert(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to load locations."
            );
        }
    };


    // =========================================================
    // FETCH BUILDINGS
    // =========================================================

    const fetchBuildings = async (locationId) => {

        if (!locationId) {

            setBuildings([]);

            return;
        }


        try {

            setBuildingLoading(true);

            const response =
                await api.get(
                    `/buildings/location/${locationId}`
                );

            setBuildings(
                response.data || []
            );

        } catch (error) {

            console.error(
                "Building API Error:",
                error
            );

            setBuildings([]);

            alert(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to load buildings."
            );

        } finally {

            setBuildingLoading(false);
        }
    };


    // =========================================================
    // FETCH COMPANY
    // =========================================================

    const fetchCompany = async () => {

        try {

            setLoading(true);

            const response =
                await api.get(
                    `/companies/${id}`
                );

            const company = response.data;


            // -----------------------------------------
            // GET LOCATION ID
            // -----------------------------------------

            const locationId =
                company.location?.id
                    ? String(company.location.id)
                    : "";


            // -----------------------------------------
            // GET BUILDING ID
            // -----------------------------------------

            const buildingId =
                company.building?.id
                    ? String(company.building.id)
                    : "";


            // -----------------------------------------
            // SET FORM
            // -----------------------------------------

            setFormData({

                companyName:
                    company.companyName || "",

                companyCode:
                    company.companyCode || "",

                industry:
                    company.industry || "",

                address:
                    company.address || "",

                contactPerson:
                    company.contactPerson || "",

                phone:
                    company.phone || "",

                email:
                    company.email || "",

                locationId:
                locationId,

                buildingId:
                buildingId,

                isActive:
                    company.isActive ?? true
            });


            // -----------------------------------------
            // LOAD BUILDINGS
            // -----------------------------------------

            if (locationId) {

                await fetchBuildings(
                    locationId
                );
            }

        } catch (error) {

            console.error(
                "Company API Error:",
                error
            );


            if (
                error.response?.status === 404
            ) {

                alert(
                    "Company not found."
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
                    "Failed to load company."
                );
            }


            navigate("/companies");

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // LOAD DATA
    // =========================================================

    useEffect(() => {

        const loadData = async () => {

            await fetchLocations();

            await fetchCompany();
        };

        loadData();

    }, [id]);


    // =========================================================
    // HANDLE INPUT
    // =========================================================

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


    // =========================================================
    // HANDLE LOCATION CHANGE
    // =========================================================

    const handleLocationChange = async (event) => {

        const locationId =
            event.target.value;


        setFormData((previous) => ({

            ...previous,

            locationId: locationId,

            buildingId: ""
        }));


        // Load buildings for selected location

        await fetchBuildings(
            locationId
        );
    };


    // =========================================================
    // UPDATE COMPANY
    // =========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        // -----------------------------------------
        // LOCATION VALIDATION
        // -----------------------------------------

        if (!formData.locationId) {

            alert(
                "Please select a location."
            );

            return;
        }


        // -----------------------------------------
        // BUILDING VALIDATION
        // -----------------------------------------

        if (!formData.buildingId) {

            alert(
                "Please select a building."
            );

            return;
        }


        try {

            setSaving(true);


            // -----------------------------------------
            // COMPANY DATA
            // -----------------------------------------

            const companyData = {

                companyName:
                formData.companyName,

                companyCode:
                formData.companyCode,

                industry:
                formData.industry,

                address:
                formData.address,

                contactPerson:
                formData.contactPerson,

                phone:
                formData.phone,

                email:
                formData.email,

                isActive:
                formData.isActive
            };


            // -----------------------------------------
            // PUT REQUEST
            // -----------------------------------------

            await api.put(

                `/companies/${id}` +
                `?locationId=${formData.locationId}` +
                `&buildingId=${formData.buildingId}`,

                companyData
            );


            // -----------------------------------------
            // SUCCESS
            // -----------------------------------------

            alert(
                "Company updated successfully."
            );


            navigate(
                "/companies"
            );


        } catch (error) {

            console.error(
                "Update Company Error:",
                error
            );


            if (
                error.response?.status === 403
            ) {

                alert(
                    "Only ADMIN can update company."
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

                    "Failed to update company."
                );
            }

        } finally {

            setSaving(false);
        }
    };


    // =========================================================
    // LOADING PAGE
    // =========================================================

    if (loading) {

        return (

            <div className="add-company-page">

                <div className="company-loading">

                    Loading company...

                </div>

            </div>
        );
    }


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="add-company-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="add-company-header">

                <div>

                    <h1>
                        Edit Company
                    </h1>

                    <p>
                        Update company information.
                    </p>

                </div>

            </div>


            {/* =================================================
                FORM CARD
            ================================================= */}

            <div className="add-company-card">

                <form
                    onSubmit={handleSubmit}
                >


                    {/* =================================================
                        FORM GRID
                    ================================================= */}

                    <div className="form-grid">


                        {/* ================= COMPANY NAME ================= */}

                        <div className="form-group">

                            <label>
                                Company Name *
                            </label>

                            <input
                                type="text"
                                name="companyName"
                                value={
                                    formData.companyName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter company name"
                                required
                            />

                        </div>


                        {/* ================= COMPANY CODE ================= */}

                        <div className="form-group">

                            <label>
                                Company Code *
                            </label>

                            <input
                                type="text"
                                name="companyCode"
                                value={
                                    formData.companyCode
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter company code"
                                required
                            />

                        </div>


                        {/* ================= INDUSTRY ================= */}

                        <div className="form-group">

                            <label>
                                Industry
                            </label>

                            <input
                                type="text"
                                name="industry"
                                value={
                                    formData.industry
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Example: IT"
                            />

                        </div>


                        {/* ================= LOCATION ================= */}

                        <div className="form-group">

                            <label>
                                Location *
                            </label>

                            <select
                                name="locationId"
                                value={
                                    formData.locationId
                                }
                                onChange={
                                    handleLocationChange
                                }
                                required
                            >

                                <option value="">
                                    Select Location
                                </option>


                                {locations.map(
                                    (location) => (

                                        <option
                                            key={
                                                location.id
                                            }
                                            value={
                                                location.id
                                            }
                                        >

                                            {
                                                location.locationCode
                                            }

                                            {" - "}

                                            {
                                                location.locationName
                                            }

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* ================= ADDRESS ================= */}

                        <div className="form-group">

                            <label>
                                Address
                            </label>

                            <input
                                type="text"
                                name="address"
                                value={
                                    formData.address
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter address"
                            />

                        </div>


                        {/* ================= BUILDING ================= */}

                        <div className="form-group">

                            <label>
                                Building *
                            </label>

                            <select
                                name="buildingId"
                                value={
                                    formData.buildingId
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                disabled={
                                    !formData.locationId ||
                                    buildingLoading
                                }
                            >

                                <option value="">

                                    {buildingLoading

                                        ? "Loading buildings..."

                                        : !formData.locationId

                                            ? "Select Location first"

                                            : "Select Building"
                                    }

                                </option>


                                {buildings.map(
                                    (building) => (

                                        <option
                                            key={
                                                building.id
                                            }
                                            value={
                                                building.id
                                            }
                                        >

                                            {
                                                building.buildingCode
                                            }

                                            {" - "}

                                            {
                                                building.buildingName
                                            }

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* ================= CONTACT PERSON ================= */}

                        <div className="form-group">

                            <label>
                                Contact Person
                            </label>

                            <input
                                type="text"
                                name="contactPerson"
                                value={
                                    formData.contactPerson
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter contact person"
                            />

                        </div>


                        {/* ================= PHONE ================= */}

                        <div className="form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter phone number"
                            />

                        </div>


                        {/* ================= EMAIL ================= */}

                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter email"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        ACTIVE
                    ================================================= */}

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

                            Active Company

                        </label>

                    </div>


                    {/* =================================================
                        BUTTONS
                    ================================================= */}

                    <div className="add-company-actions">


                        {/* CANCEL */}

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate(
                                    "/companies"
                                )
                            }
                        >

                            Cancel

                        </button>


                        {/* UPDATE */}

                        <button
                            type="submit"
                            className="save-company-btn"
                            disabled={saving}
                        >

                            {saving

                                ? "Updating..."

                                : "Update Company"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};


export default EditCompany;