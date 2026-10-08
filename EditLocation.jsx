import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const DEVICE_TYPES = ["Laptop", "Desktop", "Mobile", "Tablet", "None"];

const EditLocation = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        locationCode: "",
        locationName: "",
        headOffice: false,
        whatsappRequired: false,
        teamsRequired: false,
        volunteerFlowRequired: false,
        esslReconcile: false,
        deviceType: "",
        inOutLocationName: "",
    });

    // Read-only, server-set fields - shown for context, never edited.
    const [meta, setMeta] = useState({ createdBy: "", updatedBy: "" });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await api.get(`/locations/${id}`);

                setFormData({
                    ...response.data,
                    deviceType: response.data.deviceType || "",
                    inOutLocationName: response.data.inOutLocationName || "",
                });

                setMeta({
                    createdBy: response.data.createdBy || "-",
                    updatedBy: response.data.updatedBy || "-",
                });
            } catch (err) {
                setError(
                    err.response?.data?.error ||
                    "Failed to load location"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        setError("");
    };

    const handleYesNoChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value === "Yes",
        });

        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.locationCode.trim()) {
            setError("Location Code is required");
            return;
        }

        if (!formData.locationName.trim()) {
            setError("Location Name is required");
            return;
        }

        try {
            setSaving(true);

            const payload = { ...formData };

            await api.put(`/locations/${id}`, payload);

            navigate("/locations");
        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Failed to update location"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Header />

            <div className="dashboard-body">
                <Sidebar />

                <main className="dashboard-main">
                    <div className="page-title">
                        <h1>Edit Location</h1>
                        <p>Update office location details.</p>
                    </div>

                    <div className="dashboard-card form-card">

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <p>Loading location...</p>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">

                                    <div className="form-group">
                                        <label>Location Code *</label>
                                        <input
                                            type="text"
                                            name="locationCode"
                                            value={formData.locationCode}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Location Name *</label>
                                        <input
                                            type="text"
                                            name="locationName"
                                            value={formData.locationName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Head Office</label>
                                        <select
                                            value={formData.headOffice ? "Yes" : "No"}
                                            onChange={(e) =>
                                                handleYesNoChange("headOffice", e.target.value)
                                            }
                                        >
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>WhatsApp Required</label>
                                        <select
                                            value={formData.whatsappRequired ? "Yes" : "No"}
                                            onChange={(e) =>
                                                handleYesNoChange("whatsappRequired", e.target.value)
                                            }
                                        >
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Teams Required</label>
                                        <select
                                            value={formData.teamsRequired ? "Yes" : "No"}
                                            onChange={(e) =>
                                                handleYesNoChange("teamsRequired", e.target.value)
                                            }
                                        >
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Volunteer Flow Required</label>
                                        <select
                                            value={formData.volunteerFlowRequired ? "Yes" : "No"}
                                            onChange={(e) =>
                                                handleYesNoChange("volunteerFlowRequired", e.target.value)
                                            }
                                        >
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>ESSL Reconcile</label>
                                        <select
                                            value={formData.esslReconcile ? "Yes" : "No"}
                                            onChange={(e) =>
                                                handleYesNoChange("esslReconcile", e.target.value)
                                            }
                                        >
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Device Type</label>
                                        <select
                                            name="deviceType"
                                            value={formData.deviceType}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select device type</option>
                                            {DEVICE_TYPES.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>In/Out Location Name</label>
                                        <input
                                            type="text"
                                            name="inOutLocationName"
                                            value={formData.inOutLocationName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Created By</label>
                                        <input
                                            type="text"
                                            value={meta.createdBy}
                                            disabled
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Updated By</label>
                                        <input
                                            type="text"
                                            value={meta.updatedBy}
                                            disabled
                                        />
                                    </div>

                                </div>

                                <div className="button-group">
                                    <button
                                        type="submit"
                                        className="primary-button submit-btn"
                                        disabled={saving}
                                    >
                                        {saving ? "Updating..." : "Update"}
                                    </button>

                                    <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={() => navigate("/locations")}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EditLocation;