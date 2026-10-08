import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const PAGE_SIZE = 10;

const YesNo = ({ value }) => (
    <span className={`badge ${value ? "badge-yes" : "badge-no"}`}>
        {value ? "Yes" : "No"}
    </span>
);

const LocationList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const isAdmin = user?.role === "ADMIN";

    const [locations, setLocations] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const isSearching = search.trim().length > 0;

    const fetchLocations = async (pageNumber) => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/locations", {
                params: {
                    page: pageNumber,
                    size: PAGE_SIZE,
                },
            });

            setLocations(response.data.content || []);
            setTotalPages(response.data.totalPages ?? 0);
        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Failed to load locations"
            );
        } finally {
            setLoading(false);
        }
    };

    // When searching, pull every location (one large page) so the
    // search covers the whole list, not just the page on screen.
    const fetchAllForSearch = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/locations", {
                params: { page: 0, size: 1000 },
            });

            setLocations(response.data.content || []);
        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Failed to load locations"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isSearching) {
            fetchAllForSearch();
        } else {
            fetchLocations(page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isSearching]);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete location "${name}"?`)) {
            return;
        }

        try {
            await api.delete(`/locations/${id}`);

            if (isSearching) {
                fetchAllForSearch();
            } else {
                fetchLocations(page);
            }
        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Failed to delete location"
            );
        }
    };

    const filteredLocations = locations.filter((location) => {
        const term = search.trim().toLowerCase();

        if (!term) return true;

        return (
            location.locationCode?.toLowerCase().includes(term) ||
            location.locationName?.toLowerCase().includes(term)
        );
    });

    return (
        <div className="dashboard-layout">
            <Header />

            <div className="dashboard-body">
                <Sidebar />

                <main className="dashboard-main">
                    <div className="card-header page-title-row">
                        <div>
                            <h1>Location Management</h1>
                            <p>
                                {isAdmin
                                    ? "View, add, edit and delete office locations."
                                    : "View office location details."}
                            </p>
                        </div>

                        {isAdmin && (
                            <Link
                                to="/locations/add"
                                className="primary-button"
                            >
                                + Add Location
                            </Link>
                        )}
                    </div>

                    <div className="dashboard-card">

                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search location by code or name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Location Name</th>
                                    <th>Head Office</th>
                                    <th>WhatsApp Required</th>
                                    <th>Teams Required</th>
                                    <th>Volunteer Flow Required</th>
                                    <th>ESSL Reconcile</th>
                                    <th>Device Type</th>
                                    <th>In/Out Location Name</th>
                                    <th>Created By</th>
                                    <th>Updated By</th>
                                    {isAdmin && <th>Actions</th>}
                                </tr>
                                </thead>

                                <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={isAdmin ? 12 : 11} className="table-empty">
                                            Loading locations...
                                        </td>
                                    </tr>
                                )}

                                {!loading && filteredLocations.length === 0 && (
                                    <tr>
                                        <td colSpan={isAdmin ? 12 : 11} className="table-empty">
                                            No locations found.
                                        </td>
                                    </tr>
                                )}

                                {!loading && filteredLocations.map((location) => (
                                    <tr key={location.id}>
                                        <td className="cell-code">{location.locationCode}</td>
                                        <td>{location.locationName}</td>
                                        <td><YesNo value={location.headOffice} /></td>
                                        <td><YesNo value={location.whatsappRequired} /></td>
                                        <td><YesNo value={location.teamsRequired} /></td>
                                        <td><YesNo value={location.volunteerFlowRequired} /></td>
                                        <td><YesNo value={location.esslReconcile} /></td>
                                        <td>{location.deviceType || "-"}</td>
                                        <td>{location.inOutLocationName || "-"}</td>
                                        <td>{location.createdBy || "-"}</td>
                                        <td>{location.updatedBy || "-"}</td>

                                        {isAdmin && (
                                            <td className="cell-actions">
                                                <button
                                                    className="icon-btn icon-btn-edit"
                                                    title="Edit"
                                                    onClick={() =>
                                                        navigate(`/locations/edit/${location.id}`)
                                                    }
                                                >
                                                    ✎
                                                </button>

                                                <button
                                                    className="icon-btn icon-btn-delete"
                                                    title="Delete"
                                                    onClick={() =>
                                                        handleDelete(location.id, location.locationName)
                                                    }
                                                >
                                                    🗑
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {isSearching ? (
                            <div className="pagination">
                                <span>{filteredLocations.length} result(s) found</span>
                            </div>
                        ) : (
                            <div className="pagination">
                                <span>
                                    Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
                                </span>

                                <div className="pagination-buttons">
                                    <button
                                        disabled={page === 0}
                                        onClick={() => setPage((p) => Math.max(p - 1, 0))}
                                    >
                                        ‹
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            className={i === page ? "active" : ""}
                                            onClick={() => setPage(i)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        disabled={page >= totalPages - 1}
                                        onClick={() =>
                                            setPage((p) => Math.min(p + 1, totalPages - 1))
                                        }
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default LocationList;
