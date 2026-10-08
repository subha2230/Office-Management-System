import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./BuildingList.css";

const emptyForm = {
    buildingCode: "",
    buildingName: "",
    address: "",
    isActive: true,
    locationId: "",
};


const BuildingList = () => {

    // --------------------------------
    // Logged in user
    // --------------------------------

    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";


    // --------------------------------
    // State variables
    // --------------------------------

    const [locations, setLocations] = useState([]);

    const [buildings, setBuildings] = useState([]);

    const [form, setForm] = useState(emptyForm);

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [saving, setSaving] = useState(false);


    // --------------------------------
    // Load Locations and Buildings
    // --------------------------------

    const loadData = async () => {

        setLoading(true);

        setError("");

        try {

            // Get all locations
            const locationResponse = await api.get(
                "/locations?page=0&size=100"
            );

            const locationData = locationResponse.data;

            const locationList =
                locationData.content || locationData || [];

            setLocations(locationList);


            // Get buildings for every location
            const buildingGroups = await Promise.all(

                locationList.map(async (location) => {

                    const response = await api.get(
                        `/buildings/location/${location.id}`
                    );

                    const buildingList = response.data || [];

                    return buildingList.map((building) => ({

                        ...building,

                        locationId: location.id,

                        locationName: location.locationName,

                    }));

                })

            );


            // Convert multiple arrays into one array
            const allBuildings = buildingGroups.flat();

            setBuildings(allBuildings);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to load buildings"
            );

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------
    // Load data when page opens
    // --------------------------------

    useEffect(() => {

        loadData();

    }, []);


    // --------------------------------
    // Search buildings
    // --------------------------------

    const filteredBuildings = useMemo(() => {

        return buildings.filter((building) => {

            const searchText = `
                ${building.buildingCode}
                ${building.buildingName}
                ${building.locationName}
            `.toLowerCase();

            return searchText.includes(
                search.toLowerCase()
            );

        });

    }, [buildings, search]);


    // --------------------------------
    // Handle input change
    // --------------------------------

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((previousForm) => ({

            ...previousForm,

            [name]: value,

        }));

    };


    // --------------------------------
    // Save / Update Building
    // --------------------------------

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);

        setError("");

        try {

            const buildingData = {

                buildingCode: form.buildingCode,

                buildingName: form.buildingName,

                address: form.address,

                isActive: form.isActive,

            };


            // Update existing building
            if (editingId) {

                await api.put(

                    `/buildings/${editingId}`,

                    buildingData,

                    {
                        params: {
                            locationId: form.locationId,
                        },
                    }

                );

            }

            // Create new building
            else {

                await api.post(

                    "/buildings",

                    buildingData,

                    {
                        params: {
                            locationId: form.locationId,
                        },
                    }

                );

            }


            // Clear form
            setForm(emptyForm);

            setEditingId(null);


            // Reload data
            await loadData();

        } catch (error) {

            setError(

                error.response?.data?.message ||

                error.response?.data?.error ||

                "Unable to save building"

            );

        } finally {

            setSaving(false);

        }
    };


    // --------------------------------
    // Edit Building
    // --------------------------------

    const handleEdit = (building) => {

        setEditingId(building.id);

        setForm({

            buildingCode:
                building.buildingCode || "",

            buildingName:
                building.buildingName || "",

            address:
                building.address || "",

            isActive:
                building.isActive !== false,

            locationId:
                building.locationId || "",

        });

    };


    // --------------------------------
    // Clear form
    // --------------------------------

    const handleClear = () => {

        setEditingId(null);

        setForm(emptyForm);

    };


    // --------------------------------
    // Delete Building
    // --------------------------------

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this building?"
        );

        if (!confirmDelete) {

            return;

        }


        try {

            await api.delete(
                `/buildings/${id}`
            );

            await loadData();

        } catch (error) {

            setError(

                error.response?.data?.message ||

                error.response?.data?.error ||

                "Unable to delete building"

            );

        }
    };


    // --------------------------------
    // UI
    // --------------------------------

    return (

        <div className="dashboard-layout">

            <Header />


            <div className="dashboard-body">

                <Sidebar />


                <main className="dashboard-main">

                    <div className="hierarchy-page">


                        {/* =========================
                            HIERARCHY
                        ========================== */}

                        <div className="hierarchy-flow">

                            <span className="hierarchy-node">
                                Location
                            </span>

                            <span className="hierarchy-arrow">
                                →
                            </span>

                            <span className="hierarchy-node">
                                Building
                            </span>

                            <span className="hierarchy-arrow">
                                →
                            </span>

                            <span className="hierarchy-node">
                                Company
                            </span>

                        </div>


                        {/* =========================
                            PAGE TITLE
                        ========================== */}

                        <div className="hierarchy-title">

                            <div>

                                <h1>
                                    Building Master
                                </h1>

                                <p>
                                    One Location can have many Buildings.
                                </p>

                            </div>


                            {isAdmin && (

                                <button
                                    className="hierarchy-btn hierarchy-btn-primary"
                                    onClick={handleClear}
                                >
                                    + New Building
                                </button>

                            )}

                        </div>


                        {/* =========================
                            ERROR
                        ========================== */}

                        {error && (

                            <div className="hierarchy-error">

                                {error}

                            </div>

                        )}


                        {/* =========================
                            ADD / UPDATE FORM
                        ========================== */}

                        {isAdmin && (

                            <form
                                className="hierarchy-card"
                                onSubmit={handleSubmit}
                            >

                                <h3>

                                    {editingId
                                        ? "Update Building"
                                        : "Add Building"}

                                </h3>


                                <div className="hierarchy-form-grid">


                                    {/* Building Code */}

                                    <div className="hierarchy-field">

                                        <label>
                                            Building Code
                                        </label>

                                        <input
                                            className="hierarchy-input"
                                            type="text"
                                            name="buildingCode"
                                            value={form.buildingCode}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Building Name */}

                                    <div className="hierarchy-field">

                                        <label>
                                            Building Name
                                        </label>

                                        <input
                                            className="hierarchy-input"
                                            type="text"
                                            name="buildingName"
                                            value={form.buildingName}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Location */}

                                    <div className="hierarchy-field">

                                        <label>
                                            Location
                                        </label>

                                        <select
                                            className="hierarchy-select"
                                            name="locationId"
                                            value={form.locationId}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Location
                                            </option>


                                            {locations.map((location) => (

                                                <option
                                                    key={location.id}
                                                    value={location.id}
                                                >

                                                    {location.locationCode}
                                                    {" - "}
                                                    {location.locationName}

                                                </option>

                                            ))}

                                        </select>

                                    </div>


                                    {/* Address */}

                                    <div className="hierarchy-field">

                                        <label>
                                            Address
                                        </label>

                                        <input
                                            className="hierarchy-input"
                                            type="text"
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>


                                {/* Form buttons */}

                                <div className="hierarchy-form-actions">

                                    <button
                                        type="button"
                                        className="hierarchy-btn hierarchy-btn-secondary"
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </button>


                                    <button
                                        type="submit"
                                        className="hierarchy-btn hierarchy-btn-primary"
                                        disabled={saving}
                                    >

                                        {saving
                                            ? "Saving..."
                                            : editingId
                                                ? "Update Building"
                                                : "Save Building"}

                                    </button>

                                </div>

                            </form>

                        )}


                        {/* =========================
                            BUILDING TABLE
                        ========================== */}

                        <div className="hierarchy-card">


                            {/* Search */}

                            <div className="hierarchy-toolbar">

                                <input
                                    className="hierarchy-search"
                                    type="text"
                                    placeholder="Search building or location..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                />


                                <span>

                                    {filteredBuildings.length}
                                    {" "}
                                    buildings

                                </span>

                            </div>


                            {/* Loading */}

                            {loading ? (

                                <div className="hierarchy-loading">

                                    Loading buildings...

                                </div>

                            ) : (

                                <div className="hierarchy-table-wrap">

                                    <table className="hierarchy-table">

                                        <thead>

                                        <tr>

                                            <th>
                                                Code
                                            </th>

                                            <th>
                                                Building
                                            </th>

                                            <th>
                                                Location
                                            </th>

                                            <th>
                                                Address
                                            </th>

                                            <th>
                                                Status
                                            </th>


                                            {isAdmin && (

                                                <th>
                                                    Actions
                                                </th>

                                            )}

                                        </tr>

                                        </thead>


                                        <tbody>

                                        {filteredBuildings.length > 0 ? (

                                            filteredBuildings.map(
                                                (building) => (

                                                    <tr
                                                        key={building.id}
                                                    >

                                                        <td>
                                                            {building.buildingCode}
                                                        </td>

                                                        <td>
                                                            {building.buildingName}
                                                        </td>

                                                        <td>
                                                            {building.locationName || "-"}
                                                        </td>

                                                        <td>
                                                            {building.address || "-"}
                                                        </td>


                                                        <td>

                                                                <span
                                                                    className={
                                                                        `hierarchy-badge ${
                                                                            building.isActive === false
                                                                                ? "hierarchy-badge-inactive"
                                                                                : "hierarchy-badge-active"
                                                                        }`
                                                                    }
                                                                >

                                                                    {building.isActive === false
                                                                        ? "Inactive"
                                                                        : "Active"}

                                                                </span>

                                                        </td>


                                                        {isAdmin && (

                                                            <td>

                                                                <div className="hierarchy-actions">

                                                                    <button
                                                                        type="button"
                                                                        className="hierarchy-btn hierarchy-btn-secondary"
                                                                        onClick={() =>
                                                                            handleEdit(building)
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </button>


                                                                    <button
                                                                        type="button"
                                                                        className="hierarchy-btn hierarchy-btn-danger"
                                                                        onClick={() =>
                                                                            handleDelete(building.id)
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

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan={
                                                        isAdmin ? 6 : 5
                                                    }
                                                    className="hierarchy-empty"
                                                >

                                                    No buildings found.

                                                </td>

                                            </tr>

                                        )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );
};


export default BuildingList;