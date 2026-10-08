import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AddCompany.css";

const AddCompany = () => {

    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);
    const [buildings, setBuildings] = useState([]);

    const [loading, setLoading] = useState(false);
    const [buildingLoading, setBuildingLoading] = useState(false);

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

    // ==========================================
    // FETCH LOCATIONS
    // ==========================================

    const fetchLocations = async () => {

        try {

            const response = await api.get(
                "/locations?page=0&size=100"
            );

            const data = response.data;

            setLocations(
                data.content || data
            );

        } catch (error) {

            console.error(
                "Location API Error:",
                error
            );

            alert(
                error.response?.data?.error ||
                "Failed to load locations."
            );
        }
    };

    // ==========================================
    // FETCH BUILDINGS BY LOCATION
    // ==========================================

    const fetchBuildings = async (locationId) => {

        if (!locationId) {

            setBuildings([]);

            return;
        }

        try {

            setBuildingLoading(true);

            const response = await api.get(
                `/buildings/location/${locationId}`
            );

            setBuildings(response.data || []);

        } catch (error) {

            console.error(
                "Building API Error:",
                error
            );

            setBuildings([]);

            alert(
                error.response?.data?.error ||
                "Failed to load buildings."
            );

        } finally {

            setBuildingLoading(false);
        }
    };

    // ==========================================
    // LOAD LOCATIONS
    // ==========================================

    useEffect(() => {

        fetchLocations();

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

        // LOCATION CHANGED
        if (name === "locationId") {

            setFormData((previous) => ({
                ...previous,
                locationId: value,
                buildingId: ""
            }));

            setBuildings([]);

            if (value) {

                fetchBuildings(value);

            }

            return;
        }

        // OTHER INPUTS
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

        // Validate Location
        if (!formData.locationId) {

            alert(
                "Please select a location."
            );

            return;
        }

        // Validate Building
        if (!formData.buildingId) {

            alert(
                "Please select a building."
            );

            return;
        }

        try {

            setLoading(true);

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

            // ==================================
            // SEND LOCATION + BUILDING
            // ==================================

            await api.post(
                `/companies?locationId=${formData.locationId}&buildingId=${formData.buildingId}`,
                companyData
            );

            alert(
                "Company created successfully."
            );

            navigate("/companies");

        } catch (error) {

            console.error(
                "Create Company Error:",
                error
            );

            if (
                error.response?.status === 403
            ) {

                alert(
                    "Only ADMIN can create company."
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
                    "Failed to create company."
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

        <div className="add-company-page">

            <div className="add-company-header">

                <div>

                    <h1>
                        Add Company
                    </h1>

                    <p>
                        Create a new company.
                    </p>

                </div>

            </div>

            <div className="add-company-card">

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        {/* COMPANY NAME */}

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

                        {/* COMPANY CODE */}

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

                        {/* INDUSTRY */}

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

                        {/* LOCATION */}

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
                                    handleChange
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

                        {/* BUILDING */}

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
                                        : "Select Building"}

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

                        {/* ADDRESS */}

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

                        {/* CONTACT PERSON */}

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

                        {/* PHONE */}

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

                        {/* EMAIL */}

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
                            Active Company
                        </label>

                    </div>

                    {/* BUTTONS */}

                    <div className="add-company-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate("/companies")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-company-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : "Save Company"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddCompany;